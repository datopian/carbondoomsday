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
          }
        ],
        "primaryKey": "Date"
      }
    }
  ],
  "views": []
};

const mockData = [
  [ 'Date', 'DEMOOpen', 'DEMOHigh', 'DEMOLow', 'DEMOClose' ],
  [ '2014-01-01', 14.32, 14.59, 14.00, 14.23 ],
  [ '2014-01-02', 14.06, 14.22, 13.57, 13.76 ],
  [ '2014-01-05', 13.41, 14.00, 13.22, 13.55 ]
];

const mockViews = {
  recline: {
    "id": "Graph",
    "type": "Graph",
    "state": {
      "graphType": "lines",
      "group": "Date",
      "series": [ "DEMOClose" ]
    }
  },
  simple: {
    name: "graph",
    specType: "simple",
    spec: {
      type: "line",
      group: "Date",
      series: ["DEMOClose"]
    }
  }
}


describe('Data Package View utils', () => {
  it("should generate spec for Plotly", () => {
    let plotlySpec = utils.generatePlotlySpec(mockViews['recline'], mockData);
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
    let vlSpec = utils.generateVegaLiteSpec(mockData, mockViews['recline']);
    const expected = {
      "width": 900,
      "height": 400,
      "data": {
        "values": [
          {
            "Date": "2014-01-01",
            "DEMOOpen": 14.32,
            "DEMOHigh": 14.59,
            "DEMOLow": 14,
            "DEMOClose": 14.23
          },
          {
            "Date": "2014-01-02",
            "DEMOOpen": 14.06,
            "DEMOHigh": 14.22,
            "DEMOLow": 13.57,
            "DEMOClose": 13.76
          },
          {
            "Date": "2014-01-05",
            "DEMOOpen": 13.41,
            "DEMOHigh": 14,
            "DEMOLow": 13.22,
            "DEMOClose": 13.55
          }
        ]
      },
      "layers": [
        {
          "mark": "line",
          "encoding": {
            "x": {
              "field": "Date",
              "type": "temporal"
            },
            "y": {
              "field": "DEMOClose",
              "type": "quantitative"
            }
          }
        }
      ]
    };
    expect(vlSpec).toEqual(expected);
  });

  it("should generate spec with data for HandsOnTable", () => {
    let htSpec = utils.generateHandsontableSpec(mockData);
		const expected = {
      "data": [
        [
          "2014-01-01",
          14.32,
          14.59,
          14,
          14.23
        ],
        [
          "2014-01-02",
          14.06,
          14.22,
          13.57,
          13.76
        ],
        [
          "2014-01-05",
          13.41,
          14,
          13.22,
          13.55
        ]
      ],
      "colHeaders": [
        "Date",
        "DEMOOpen",
        "DEMOHigh",
        "DEMOLow",
        "DEMOClose"
      ],
      "readOnly": true,
      "width": 1136,
      "colWidths": 47,
      "rowWidth": 27,
      "stretchH": "all",
      "columnSorting": true,
      "search": true
    };
  });

  it('normalizeView - add dataSource', () => {
    const inView = {
      name: 'graph-1',
      spec: {
      }
    };
    utils.normalizeView(inView);
    const expected = {
      name: 'graph-1',
      resources: [ 0 ],
      spec: {}
    }
    expect(inView).toEqual(expected);
  });

  it('convertReclineToSimple', () => {
    const out = utils.convertReclineToSimple(mockViews['recline']);
    const expected = {
      name: "graph",
      specType: "simple",
      spec: {
        type: "line",
        group: "Date",
        series: ["DEMOClose"]
      }
    };
    expect(out).toEqual(expected);
  });

  it('compileData works', () => {
    const datapackage = mockDescriptor;
    let resourceId = datapackage.resources[0].name;
    let view = {
      resources: [ resourceId ]
    }
    const resourceData = {};
    resourceData[datapackage.name] = {};
    resourceData[datapackage.name][resourceId] = mockData;

    let resourceWithValues = Object.assign({values: mockData}, datapackage.resources[0]);
    const expected = [ resourceWithValues ]

    const out = utils.compileData(view, datapackage, resourceData);

    expect(out).toEqual(expected);
  });

  it('findResourceByNameOfId', () => {
    let out = utils.findResourceByNameOfId(mockDescriptor, 'demo-resource');
    expect(out.name).toEqual('demo-resource');
  });
});

