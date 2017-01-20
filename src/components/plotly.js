import React from "react"
import Plotly from "plotly.js/lib/core"

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    Plotly.newPlot("plotly" + this.props.idx, this.props.data, this.props.layout)
  }

  render() {
    let divId = "plotly" + this.props.idx
    return (
      <div id={divId}></div>
    )
  }

}

export default PlotlyChart
