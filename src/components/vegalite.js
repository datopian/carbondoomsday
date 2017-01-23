import React from "react"
import embed from "vega-embed"

class VegaLiteChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const spec = {
      "data": {
        "values": this.props.data
      },
      "mark": "line",
      "encoding": {
        "x": {
          "field": "x",
          "type": "temporal"
        },
        "y": {
          "field": "y",
          "type": "quantitative"
        }
      }
    }
    embed("#vega", {mode: "vega-lite", spec: spec, actions: false})
  }

  render() {
    return (
      <div id="vega"></div>
    )
  }
}

export default VegaLiteChart
