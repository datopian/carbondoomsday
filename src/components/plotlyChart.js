import React from "react"
import ReclineView from "../js/reclineToPlotly.js"
import DataPackage from "../js/dataPackage.js"
import axios from "axios"


class PlotlyChart extends React.Component {

  constructor(props) {

    super(props)

    this.state = {myPlotlySpec: {}} //just an initial state

  }

  componentDidMount() {

    let _this = this

    this.serverRequest = axios
      .get(DataPackageJsonUrl)
      .then((result) => {

        let dpJson = result.data
        let dp = new ReclineView(dpJson)
        let myPlotlySpec = dp.plotlySpec

        Plotly.d3.csv(dp.getResourcePath(), (rows) => {

          myPlotlySpec.data[0].x = rows.map((row) =>
            row[myPlotlySpec.layout.xaxis.title]
          )

          myPlotlySpec.data[0].y = rows.map((row) =>
            row[myPlotlySpec.layout.yaxis.title]
          )

          _this.setState({
            myPlotlySpec: myPlotlySpec
          })
        })

      })

  }

  componentWillUnmount() {
    this.serverRequest.abort() //finishing request
  }

  componentDidUpdate() {
    Plotly.newPlot("vis", this.state.myPlotlySpec.data,
      this.state.myPlotlySpec.layout)
  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}

export default PlotlyChart
