import React from "react"

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
    vg.embed("#vega", {mode: "vega-lite", spec: spec, actions: false})
  }

  render() {
    return (
      <div id="vega"></div>
    )
  }
}

export default VegaLiteChart
