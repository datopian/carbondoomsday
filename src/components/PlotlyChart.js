import React from "react"
import Plotly from "plotly.js/lib/core"
import ReclineView from "../js/reclineToPlotly.js"
import DataPackage from "../js/dataPackage.js"
import axios from "axios"


class PlotlyChart extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      myPlotlySpec: {},
      data: []
    }

  }

  componentDidMount() {

    let _this = this

    this.serverRequest = axios
      .get(DataPackageJsonUrl)
      .then((result) => {

        let dpJson = result.data
        let dp
        if (dpJson.views[0].spec === undefined) {
          dp = new ReclineView(dpJson)
        } else {
          dp = new DataPackage(dpJson)
        }

        let myPlotlySpec = dp.plotlySpec

        Plotly.d3.csv(dp.getResourcePath(), (rows) => {
          let dataset = []
          if (dp.series instanceof Array) {
            for (let i = 0; i < dp.series.length; i++) {
              dataset.push({x: [], y: [], mode: "lines", name: dp.series[i]})
              dataset[i].x = rows.map((row) =>
                row[dp.plotlySpec.layout.xaxis.title]
              )

              dataset[i].y = rows.map((row) =>
                row[dp.series[i]]
              )
            }
          } else {
            dataset.push({x: [], y: [], mode: "lines"})
            dataset[0].x = rows.map((row) =>
              row[dp.plotlySpec.layout.xaxis.title]
            )

            dataset[0].y = rows.map((row) =>
              row[dp.series]
            )
          }

          _this.setState({
            myPlotlySpec: myPlotlySpec,
            data: dataset
          })
        })

      })

  }

  componentWillUnmount() {
    this.serverRequest.abort() //finishing request
  }

  componentDidUpdate() {
    Plotly.newPlot("vis", this.state.data,
      this.state.myPlotlySpec.layout)
  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}

export default PlotlyChart
