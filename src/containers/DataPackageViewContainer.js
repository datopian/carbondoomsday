import React from "react"
import PlotlyChart from "../components/plotly.js"
//connect redux:
import { connect } from 'react-redux'
import * as actions from '../actions/datapackageActions'

export class DataPackageViewContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      layout: []
    }
  }

  componentDidMount() {
    //dispatch redux actions
    const {dispatch} = this.props
    dispatch(actions.getDataPackage(DataPackageJsonUrl))
  }

  generateSpec(view) {
    return ({
      "layout": {
        "xaxis": {
          "title": view.state.group
        }
      }
    })
  }

  convertData(data, dp) {
    let dataset = []
    let group = dp.views[0].state.group
    let series = dp.views[0].state.series
    let xIndex
    let yIndex = []
    data[0].forEach((header, index) => {
      if(header == group) {xIndex = index}
      series.forEach(serie => {
        if(header == serie) {yIndex.push(index)}
      })
    })
    for (let i = 0; i < series.length; i++) {
      dataset.push({x: [], y: [], mode: "lines", name: series[i]})
      dataset[i].x = data.slice(1).map(row => row[xIndex])
      dataset[i].y = data.slice(1).map(row => row[yIndex[i]])
    }
    return dataset
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.datapackage) {
      if(nextProps.datapackage.resources.length == nextProps.resources.length) {
        if(nextProps.datapackage.views) {
          nextProps.datapackage.views.forEach(async (view, index) => {
            let data = await this.convertData(
              nextProps.resources[index],
              nextProps.datapackage
            )
            let layout = await this.generateSpec(view)
            this.setState({
              data: data,
              layout: layout
            })
          })
        }
      }
    }
  }

  render() {
    return (
      <PlotlyChart data={this.state.data} layout={this.state.layout} />
    )
  }
}

const mapStateToProps = (state) => {
  const { datapackage, resources } = state

  return {
    datapackage: datapackage,
    resources: resources
  }
}

export default connect(mapStateToProps)(DataPackageViewContainer)
