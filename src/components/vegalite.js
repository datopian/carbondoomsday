import React from "react"
import embed from "vega-embed"

class VegaLiteChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    embed("#vega", {mode: "vega-lite", spec: this.props.vlSpec, actions: false})
  }

  render() {
    return (
      <div id="vega"></div>
    )
  }
}

export default VegaLiteChart
