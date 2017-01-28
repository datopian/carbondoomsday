import React from "react";
import embed from "vega-embed";

class VegaLiteChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    embed(
      "#vega" + this.props.idx,
      {
        mode: "vega-lite",
        spec: this.props.vlSpec,
        actions: false
      }
    );
  }

  render() {
    let divId = "vega" + this.props.idx;
    return (
      <div id={divId}></div>
    );
  }
}

export default VegaLiteChart;
