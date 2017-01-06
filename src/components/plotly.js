import React from "react"
import Plotly from "plotly.js/lib/core"

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
