import React from "react"
import PlotlyChart from "../components/plotly.js"
import VegaLiteChart from "../components/vegalite"
//connect redux:
import { connect } from 'react-redux'
import * as actions from '../actions/datapackageActions'

//This container component listens to updates in datapackage and resources from
//the Redux Store. It then generates either Plotly or Vega-lite spec and renders
//appropriate chart.
export class DataPackageViewContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      graphType: "",
      data: [],
      layout: [],
      vlSpec: {}
    }
  }

  //Takes data and view, then generates vega-lite specific spec.
  generateVegaLiteSpec(data, view) {
    let vlSpec = {
      "width": 900,
      "height": 400,
      "data": {"values": []},
      "layers": []
    }
    let headers = data.shift()
    let objects = data.map(values => {
      return headers.reduce((o, k, i) => {
        o[k] = values[i]
        return o
      }, {})
    })
    vlSpec.data.values = objects
    for(let i=0; i<view.state.series.length; i++) {
      let layer = {
        "mark": "line",
        "encoding": {
          "x": {"field": "", "type": "temporal"},
          "y": {"field": "", "type": "quantitative"}
        }
      }
      layer.encoding.x.field = view.state.group
      layer.encoding.y.field = view.state.series[i]
      vlSpec.layers.push(layer)
    }
    return vlSpec
  }

  //Takes a view and generates Plotly layout.
  generatePlotlySpec(view) {
    return ({
      "layout": {
        "xaxis": {
          "title": view.state.group
        }
      }
    })
  }

  //Takes a single resource and descriptor, then converts resource into Plotly
  //specific format.
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
    let graphType
    if(nextProps.datapackage.resources) {
      //check if resources are received by comparing descriptor's resources and
      //received data length
      if(nextProps.datapackage.resources.length == nextProps.resources[0].length) {
        if(nextProps.datapackage.views) {
          graphType = nextProps.datapackage.views[this.props.idx].type
        }
      }
    }

    if(graphType == "vega-lite") {
      let vlSpec = await this.generateVegaLiteSpec(
        nextProps.resources[0][this.props.idx],
        nextProps.datapackage.views[this.props.idx]
      )
      this.setState({
        graphType: graphType,
        vlSpec: vlSpec
      })
    } else {
      let data = await this.convertData(
        nextProps.resources[0][this.props.idx],
        nextProps.datapackage
      )
      let layout = await this.generateSpec(nextProps.datapackage.views[this.props.idx])
      this.setState({
        graphType: graphType,
        data: data,
        layout: layout
      })
    }
  }

  render() {
    //Check if graph type is vega-lite. If so render VegaLiteChart with vlSpec.
    //Else render PlotlyChart component and pass data, layout, and index.
    if(this.state.graphType == "vega-lite") {
      return (
        <VegaLiteChart vlSpec={this.state.vlSpec} idx={this.props.idx} />
      )
    }
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
