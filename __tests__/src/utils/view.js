import * as utils from '../../../src/utils/view'

const mockDescriptor = {
  name: 'demo-package'
  , resources: [
    {
      name: 'demo-resource'
      , path: 'data/demo-resource.csv'
      , format: 'csv'
      , mediatype: 'text/csv'
      , schema: {
        fields: [
          {
            name: 'Date'
            , type: 'date'
            , description: ''
          }
          , {
            name: 'Open'
            , type: 'number'
            , description: ''
          }
          , {
            name: 'High'
            , type: 'number'
            , description: ''
          }
        ]
        , primaryKey: 'Date'
      }
    }
  ]
  , views: []
}

const mockData = [
  ['Date', 'Open', 'High']
  , ['2014-01-01', 14.32, 14.59]
  , ['2014-01-02', 14.06, 14.22]
  , ['2014-01-05', 13.41, 14.00]
]

const mockTable1 = [
  { Date: '2014-01-01', Open: 14.32, High: 14.59 }
  , { Date: '2014-01-02', Open: 14.06, High: 14.22 }
  , { Date: '2014-01-05', Open: 13.41, High: 14.00 }
]

const mockViews = {
  recline: {
    id: 'Graph'
    , type: 'Graph'
    , state: {
      graphType: 'lines'
      , group: 'Date'
      , series: ['High']
    }
  }
  , simple: {
    name: 'graph'
    , specType: 'simple'
    , spec: {
      type: 'line'
      , group: 'Date'
      , series: ['High']
    }
  }
  , simple2: {
    name: 'graph'
    , specType: 'simple'
    , spec: {
      type: 'line'
      , group: 'Date'
      , series: ['High', 'Open']
    }
  }
  , simpleBar: {
    name: 'graph'
    , specType: 'simple'
    , spec: {
      type: 'bar'
      , group: 'Date'
      , series: ['High']
    }
  }
}

const mockDataPackageData = {}
mockDataPackageData[mockDescriptor.name] = {}
mockDataPackageData[mockDescriptor.name][mockDescriptor.resources[0].name] = mockTable1

const plotlyExpected = {
  simple: {
    data: [
      {
        x: [
          '2014-01-01'
          , '2014-01-02'
          , '2014-01-05'
        ]
        , y: [
          14.59
          , 14.22
          , 14
        ]
        , type: 'scatter'
        , mode: 'lines'
        , line: { width: 2, shape: 'spline' }
        , name: 'High'
      }
    ]
    , layout: {
      xaxis: {
        title: 'Date'
      }
    }
  }
  , simple2: {
    data: [
      {
        x: [
          '2014-01-01'
          , '2014-01-02'
          , '2014-01-05'
        ]
        , y: [
          14.59
          , 14.22
          , 14
        ]
        , name: 'High'
        , type: 'scatter'
        , mode: 'lines'
        , line: {
          width: 2
          , shape: 'spline'
        }
      }
      , {
        x: [
          '2014-01-01'
          , '2014-01-02'
          , '2014-01-05'
        ]
        , y: [
          14.32
  , 14.06
  , 13.41
        ]
        , name: 'Open'
        , type: 'scatter'
        , mode: 'lines'
        , line: {
          width: 2
  , shape: 'spline'
        }
      }
    ]
    , layout: {
      xaxis: {
        title: 'Date'
      }
    }
  }
  , simpleBar: {
    data: [
      {
        x: [
          '2014-01-01'
          , '2014-01-02'
          , '2014-01-05'
        ]
        , y: [
          14.59
          , 14.22
          , 14
        ]
        , name: 'High'
        , type: 'bar'
      }
    ]
    , layout: {
      xaxis: {
        title: 'Date'
      }
    }
  }
}


describe('Data Package View utils', () => {
  it('should generate Plotly spec - lines', () => {
    const view = utils.compileView(mockViews.simple, mockDescriptor, mockDataPackageData)
    const plotlySpec = utils.simpleToPlotly(view)
    expect(plotlySpec).toEqual(plotlyExpected.simple)
  })
  it('should generate Plotly spec - 2 lines', () => {
    const view = utils.compileView(mockViews.simple2, mockDescriptor, mockDataPackageData)
    const plotlySpec = utils.simpleToPlotly(view)
    expect(plotlySpec).toEqual(plotlyExpected.simple2)
  })
  it('should generate Plotly spec - bar', () => {
    const view = utils.compileView(mockViews.simpleBar, mockDescriptor, mockDataPackageData)
    const plotlySpec = utils.simpleToPlotly(view)
    expect(plotlySpec).toEqual(plotlyExpected.simpleBar)
  })
})


describe('Data Package View utils - HandsOnTable ', () => {
  it('should generate handsontable -> handsontable', () => {
    const view = {
      name: 'table-resource1'
      , resources: ['demo-resource']
      , specType: 'handsontable'
    }
    const viewCompiled = utils.compileView(view, mockDescriptor, mockDataPackageData)
    const outSpec = utils.handsOnTableToHandsOnTable(viewCompiled)
    const expected = {
      data: [
        {
          Date: '2014-01-01'
          , Open: 14.32
          , High: 14.59
        }
        , {
          Date: '2014-01-02'
          , Open: 14.06
          , High: 14.22
        }
        , {
          Date: '2014-01-05'
          , Open: 13.41
          , High: 14
        }
      ]
      , colHeaders: [
        'Date'
        , 'Open'
        , 'High'
      ]
      , readOnly: true
      , width: 1136
      , height: null
      , colWidths: 47
      , rowWidth: 27
      , stretchH: 'all'
      , columnSorting: true
      , search: true
    }
    // console.log(JSON.stringify(outSpec, null, 2));
    expect(outSpec).toEqual(expected)
  })
})


describe('Old spec generation - to be removed soon', () => {
  it('should generate spec for Plotly', () => {
    const plotlySpec = utils.generatePlotlySpec(mockViews.recline, mockData)
    const expected = {
      data: [
        {
          x: [
            '2014-01-01'
            , '2014-01-02'
            , '2014-01-05'
          ]
          , y: [
            14.59
            , 14.22
            , 14
          ]
          , mode: 'lines'
          , name: 'High'
        }
      ]
      , layout: {
        xaxis: {
          title: 'Date'
        }
      }
    }
    // console.log(JSON.stringify(plotlySpec, null, 2));
    expect(plotlySpec).toEqual(expected)
  })

  it('should generate vega-lite spec', () => {
    const vlSpec = utils.generateVegaLiteSpec(mockData, mockViews.recline)
    const expected = {
      width: 900
      , height: 400
      , data: {
        values: [
          {
            Date: '2014-01-01'
            , Open: 14.32
            , High: 14.59
          }
          , {
            Date: '2014-01-02'
            , Open: 14.06
            , High: 14.22
          }
          , {
            Date: '2014-01-05'
            , Open: 13.41
            , High: 14
          }
        ]
      }
      , layers: [
        {
          mark: 'line'
          , encoding: {
            x: {
              field: 'Date'
              , type: 'temporal'
            }
            , y: {
              field: 'High'
              , type: 'quantitative'
            }
          }
        }
      ]
    }
    expect(vlSpec).toEqual(expected)
  })

  it('should generate spec with data for HandsOnTable', () => {
    const htSpec = utils.generateHandsontableSpec(mockData)
    const expected = {
      data: [
        [
          '2014-01-01'
          , 14.32
          , 14.59
          , 14
          , 14.23
        ]
        , [
          '2014-01-02'
          , 14.06
          , 14.22
          , 13.57
          , 13.76
        ]
        , [
          '2014-01-05'
          , 13.41
          , 14
          , 13.22
          , 13.55
        ]
      ]
      , colHeaders: [
        'Date'
        , 'DEMOOpen'
        , 'DEMOHigh'
        , 'DEMOLow'
        , 'DEMOClose'
      ]
      , readOnly: true
      , width: 1136
      , colWidths: 47
      , rowWidth: 27
      , stretchH: 'all'
      , columnSorting: true
      , search: true
    }
  })
})


describe('Basic view utility functions', () => {
  it('normalizeView - add dataSource', () => {
    const inView = {
      name: 'graph-1'
      , spec: {
      }
    }
    utils.normalizeView(inView)
    const expected = {
      name: 'graph-1'
      , resources: [0]
      , spec: {}
    }
    expect(inView).toEqual(expected)
  })

  it('convertReclineToSimple', () => {
    const out = utils.convertReclineToSimple(mockViews.recline)
    const expected = {
      name: 'graph'
      , specType: 'simple'
      , spec: {
        type: 'line'
        , group: 'Date'
        , series: ['High']
      }
    }
    expect(out).toEqual(expected)
  })

  it('compileData works', () => {
    const resourceId = mockDescriptor.resources[0].name
    let view = {
      resources: [resourceId]
    }
    const resourceWithValues = Object.assign({ values: mockTable1 }, mockDescriptor.resources[0])
    const expected = [resourceWithValues]
    let out = utils.compileData(view, mockDescriptor, mockDataPackageData)
    expect(out).toEqual(expected)

    // check it works with resource index as well
    view = {
      resources: [0]
    }
    out = utils.compileData(view, mockDescriptor, mockDataPackageData)
    expect(out).toEqual(expected)
  })

  it('findResourceByNameOrIndex with name', () => {
    const out = utils.findResourceByNameOrIndex(mockDescriptor, 'demo-resource')
    expect(out.name).toEqual('demo-resource')
  })

  it('findResourceByNameOrIndex with index', () => {
    const out = utils.findResourceByNameOrIndex(mockDescriptor, 0)
    expect(out.name).toEqual('demo-resource')
  })

  it('compileView works', () => {
    const out = utils.compileView(mockViews.simple, mockDescriptor, mockDataPackageData)
    expect(out.resources[0].format).toEqual('csv')
    expect(out.resources[0].values.length).toEqual(3)
  })
})

