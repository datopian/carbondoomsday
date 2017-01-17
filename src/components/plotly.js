import React from "react"
import Plotly from "plotly.js/lib/core"

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    Plotly.newPlot("vis", this.props.data, this.props.layout)
  }
  
  render() {
    return (
      <div id="vis"></div>
    )
  }

}

export default PlotlyChart
