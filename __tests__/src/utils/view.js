import * as utils from "../../../src/utils/view.js"

const mockDescriptor = {
  "resources": [
    {
      "name": "demo-resource",
      "path": "data/demo-resource.csv",
      "format": "csv",
      "mediatype": "text/csv",
      "schema": {
        "fields": [
          {
            "name": "Date",
            "type": "date",
            "description": ""
          },
          {
            "name": "DEMOOpen",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOHigh",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOLow",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOClose",
            "type": "number",
            "description": ""
          }
        ],
        "primaryKey": "Date"
      }
    }
  ],
  "views": [
    {
      "id": "Graph",
      "type": "Graph",
      "state": {
        "graphType": "lines",
        "group": "Date",
        "series": [ "DEMOClose" ]
      }
    }
  ]
};

const mockData = [
  [ 'Date', 'DEMOOpen', 'DEMOHigh', 'DEMOLow', 'DEMOClose' ],
  [ '2014-01-01', 14.32, 14.59, 14.00, 14.23 ],
  [ '2014-01-02', 14.06, 14.22, 13.57, 13.76 ],
  [ '2014-01-05', 13.41, 14.00, 13.22, 13.55 ]
];


describe('Data Package View utils', () => {
  it("should generate spec for Plotly", () => {
    const viewSpec = mockDescriptor.views[0];
    let plotlySpec = utils.generatePlotlySpec(viewSpec, mockData);
    var expected = {
			"data": [
        {
          "x": [
            "2014-01-01",
            "2014-01-02",
            "2014-01-05"
          ],
          "y": [
            14.23,
            13.76,
            13.55
          ],
          "mode": "lines",
          "name": "DEMOClose"
        }
      ],
      "layout": {
        "xaxis": {
          "title": "Date"
        }
      }
    }
    // console.log(JSON.stringify(plotlySpec, null, 2));
    expect(plotlySpec).toEqual(expected);
  });

  it("should generate vega-lite spec", () => {
    let vlSpec = utils.generateVegaLiteSpec(mockData, mockDescriptor.views[0]);
    expect(vlSpec.layers[0].mark).toEqual("line");
    expect(vlSpec.data.values[0].DEMOClose).toEqual(14.23);
    expect(vlSpec.layers[0].encoding.x.field).toEqual("Date");
    expect(vlSpec.layers[0].encoding.y.field).toEqual("DEMOClose");
  });

  it("should generate spec with data for HandsOnTable", () => {
    let htSpec = utils.generateHandsontableSpec(mockData);
    expect(htSpec.data.length).toEqual(mockData.length-1);
    expect(htSpec.colHeaders[4]).toEqual('DEMOClose');
  });
});

