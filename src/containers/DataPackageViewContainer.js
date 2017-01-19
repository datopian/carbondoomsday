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
    let group = dp.views[this.props.idx].state.group
    let series = dp.views[this.props.idx].state.series
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

  async componentWillReceiveProps(nextProps) {
    if(nextProps.datapackage.resources) {
      if(nextProps.datapackage.resources.length == nextProps.resources[0].length) {
        if(nextProps.datapackage.views) {
          console.log(this.props.idx)
          let data = await this.convertData(
            nextProps.resources[0][this.props.idx],
            nextProps.datapackage
          )
          let layout = await this.generateSpec(nextProps.datapackage.views[this.props.idx])
          this.setState({
            data: data,
            layout: layout
          })

        }
      }
    }
  }

  render() {
    return (
      <PlotlyChart data={this.state.data} layout={this.state.layout} idx={this.props.idx} />
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
