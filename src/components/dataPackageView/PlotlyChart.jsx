import React from 'react'
import Plotly from 'plotly.js/lib/core'

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Plotly.newPlot(`plotly${this.props.idx}`, this.props.data, this.props.layout)
  }

  render() {
    const divId = `plotly${this.props.idx}`
    return (
      <div id={divId} />
    )
  }

}

export default PlotlyChart
