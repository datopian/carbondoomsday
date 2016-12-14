import React from 'react';
import dp from 'json!../../fixtures/dp1/datapackage.json'

const embedSpec = {
  mode: "vega-lite",
  spec: {
    "data": {
      "url": "fixtures/dp1/" + dp.resources[0].path,
      "format": {"type": "csv"}
    },
    "mark": dp.views[0].spec.mark,
    "encoding": {
      "y": {
        "field": dp.views[0].spec.encoding.y.field,
        "type": dp.views[0].spec.encoding.y.type
      },
      "x": {
        "field": dp.views[0].spec.encoding.x.field,
        "type": dp.views[0].spec.encoding.x.type
      }
    }

  }
};

class Chart extends React.Component {
  componentDidMount() {
    vg.embed("#vis", embedSpec);
  };
  render() {
    return (
      <div id="vis"></div>
    );
  }
}

export default Chart;
