import React from "react"
import PlotlyChart from "../components/plotly.js"
import VegaLiteChart from "../components/vegalite"
import HandsOnTable from "../components/handsontable"
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
      plotlySpec: {},
      vlSpec: {},
      htSpec: {}
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
    let headers = data[0]
    let objects = data.slice(1).map(values => {
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

  //Takes a single resource and descriptor, then converts resource into Plotly
  //specific format and generates plotlySpec.
  generatePlotlySpec(data, dp) {
    let plotlySpec = {}
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

    let layout = {
      "xaxis": {
        "title": dp.views[this.props.idx].state.group
      }
    }
    plotlySpec.data = dataset
    plotlySpec.layout = layout
    return plotlySpec
  }

  //Takes a single resource and returns Handsontable spec
  generateHandsontableSpec(data) {
    let htSpec = {
      data: data.slice(1), //excluding headers
      colHeaders: data[0], //selecting headers
      readOnly: true,
      width: 1136,
      height: function(){
        if (data.length > 16) {return 432;}
      },
      colWidths: 47,
      rowWidth: 27,
      stretchH: 'all',
      columnSorting: true,
      search: true
    }
    return htSpec
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
        //build Handsontable spec using related data resource
        let htSpec = await this.generateHandsontableSpec(nextProps.resources[0][this.props.idx])
        this.setState({
          htSpec: htSpec
        })
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
      let plotlySpec = await this.generatePlotlySpec(
        nextProps.resources[0][this.props.idx],
        nextProps.datapackage
      )
      this.setState({
        graphType: graphType,
        plotlySpec: plotlySpec
      })
    }
  }

  render() {
    //Check if graph type is vega-lite. If so render VegaLiteChart with vlSpec.
    //Else render PlotlyChart component and pass data, layout, and index.
    if(this.state.graphType == "vega-lite") {
      return (
        <div>
          <VegaLiteChart vlSpec={this.state.vlSpec} idx={this.props.idx} />
          <HandsOnTable spec={this.state.htSpec} idx={this.props.idx} />
        </div>
      )
    }
    return (
      <div>
        <PlotlyChart
          data={this.state.plotlySpec.data}
          layout={this.state.plotlySpec.layout}
          idx={this.props.idx} />
        <HandsOnTable spec={this.state.htSpec} idx={this.props.idx} />
      </div>
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
