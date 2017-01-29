// Utilities and classes for working with Data Package Views


//Takes data and view, then generates vega-lite specific spec.
export function generateVegaLiteSpec(data, view) {
  let vlSpec = {
    "width": 900,
    "height": 400,
    "data": {"values": []},
    "layers": []
  };
  let headers = data[0];
  vlSpec.data.values = data.slice(1).map(values => {
    return headers.reduce((o, k, i) => {
      o[k] = values[i];
      return o;
    }, {});
  });
  for (let i = 0; i < view.state.series.length; i++) {
    let layer = {
      "mark": "line",
      "encoding": {
        "x": {"field": "", "type": "temporal"},
        "y": {"field": "", "type": "quantitative"}
      }
    };
    layer.encoding.x.field = view.state.group;
    layer.encoding.y.field = view.state.series[i];
    vlSpec.layers.push(layer);
  }
  return vlSpec;
}

//Takes a single resource and descriptor, then converts resource into Plotly
//specific format and generates plotlySpec.
export function generatePlotlySpec(data, dp, j) {
  let plotlySpec = {};
  let dataset = [];
  let group = dp.views[j].state.group;
  let series = dp.views[j].state.series;
  let xIndex;
  let yIndex = [];
  data[0].forEach((header, index) => {
    if (header === group) {
      xIndex = index;
    }
    series.forEach(serie => {
      if (header === serie) {
        yIndex.push(index);
      }
    });
  });
  for (let i = 0; i < series.length; i++) {
    dataset.push({x: [], y: [], mode: "lines", name: series[i]});
    dataset[i].x = data.slice(1).map(row => row[xIndex]);
    dataset[i].y = data.slice(1).map(row => row[yIndex[i]]);
  }

  let layout = {
    "xaxis": {
      "title": dp.views[j].state.group
    }
  };
  plotlySpec.data = dataset;
  plotlySpec.layout = layout;
  return plotlySpec;
}

//Takes a single resource and returns Handsontable spec
export function generateHandsontableSpec(data) {
  return {
    data: data.slice(1), //excluding headers
    colHeaders: data[0], //selecting headers
    readOnly: true,
    width: 1136,
    height: function () {
      if (data.length > 16) {
        return 432;
      }
    },
    colWidths: 47,
    rowWidth: 27,
    stretchH: 'all',
    columnSorting: true,
    search: true
  };
}

