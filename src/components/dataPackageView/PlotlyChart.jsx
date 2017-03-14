import React from 'react'
import Plotly from 'plotly.js/lib/core'
const Spinner = require('react-spinkit')

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // draw a plot with initial data and layout
    Plotly.newPlot(`plotly${this.props.idx}`, this.props.data, this.props.layout)
  }

  componentDidUpdate() {
    // update the plot with new props
    Plotly.newPlot(`plotly${this.props.idx}`, this.props.data, this.props.layout)
  }

  render() {
    const divId = `plotly${this.props.idx}`
    return (
      <div id={divId} className="PlotlyGraph">
        { !this.props.data && <Spinner spinnerName="rotating-plane" /> }
      </div>
    )
  }

}

export default PlotlyChart
