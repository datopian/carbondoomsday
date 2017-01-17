import React from "react"
import PlotlyChart from "../components/plotly.js"

class DataPackageViewContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      layout: []
    }

    //dispatch redux actions
  }

  generateSpec(views) {
    let plotlySpecs = []
    views.forEach((view) => {
      let plotlySpec = {
        "layout": {
          "xaxis": {
            "title": view.state.group
          }
        }
      }
      plotlySpecs.push(plotlySpec)
    })
    return plotlySpecs
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
      dataset.push({x: [], y: [], mode: "lines"})
      dataset[i].x = data.slice(1).map(row => row[xIndex])
      dataset[i].y = data.slice(1).map(row => row[yIndex[i]])
    }
    console.log(dataset)
    return dataset
  }

  componentWillReceiveProps(nextProps) {
    let data = this.convertData(nextProps.resources[0], nextProps.datapackage)
    let layout = this.generateSpec(nextProps.datapackage.views)
    this.setState({
      data: data,
      layout: layout
    })
  }

  render() {
    return (
      <PlotlyChart data={this.state.data} layout={this.state.layout} />
    )
  }
}

export default DataPackageViewContainer
