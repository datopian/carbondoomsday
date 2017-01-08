import React from "react"
import Plotly from "plotly.js/lib/core"
import getDataPackage from "../js/getDataPackage.js"
import getDataResource from "../js/getDataResource.js"

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const spec = {
      "xaxis": {
        "type": "date",
      },
      "yaxis": {
        "type": "linear"
      }
    }
    Plotly.newPlot("vis", this.props.data, spec)
  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}

export default PlotlyChart
