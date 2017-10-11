import React from 'react'
const vega = require('vega')
const Spinner = require('react-spinkit')

class VegaChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // draw a vega chart with initial data and spec
    if(this.props.spec) {
      const runtime = vega.parse(this.props.spec)
      const view = new vega.View(runtime)
        .logLevel(vega.Warn)
        .initialize(document.querySelector(`#vega${this.props.idx}`))
        .renderer('svg')
        .hover()
        .run()
    }
  }

  componentDidUpdate() {
    // update the vega chart with new props
    if(this.props.spec) {
      const runtime = vega.parse(this.props.spec)
      const view = new vega.View(runtime)
        .logLevel(vega.Warn)
        .initialize(document.querySelector(`#vega${this.props.idx}`))
        .renderer('svg')
        .hover()
        .run()
    }
  }

  render() {
    const divId = `vega${this.props.idx}`
    return (
      <div id={divId} className="PlotlyGraph">
        { !this.props.spec && <Spinner spinnerName="rotating-plane" /> }
      </div>
    )
  }

}

export default VegaChart
