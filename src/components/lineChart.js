import React from "react";
import DataPackage from "../js/dataPackage.js"
import dpJson from "json!../../fixtures/dp1/datapackage.json"

let dp = new DataPackage(dpJson);
let path = dp.getResourcePath();
let myVegaSpec = dp.spec;

myVegaSpec["data"] = {
  "url": path,
  "format": {"type": dp.format}
};

class Chart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myVegaSpec: myVegaSpec
    };
  }

  componentDidMount() {
    vg.embed("#vis", {mode: "vega-lite", spec: this.state.myVegaSpec});
  };

  render() {
    return (
      <div id="vis"></div>
    );
  }
}

export default Chart;
