import * as utils from '../../src/utils/view'

const mockTable1 = [
  ['2014-01-01', 14.32, 14.59]
  , ['2014-01-02', 14.06, 14.22]
  , ['2014-01-05', 13.41, 14.00]
]

const mockDescriptor = {
  name: 'demo-package'
  , resources: [
    {
      name: 'demo-resource'
      , path: 'data/demo-resource.csv'
      , format: 'csv'
      , mediatype: 'text/csv'
      , _values: mockTable1
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

const mockDescriptorWithoutData =  {
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
  , vega1: {
    name: 'vega1'
    , specType: 'vega'
    , spec: {
      scale: [],
      axes: []
    }
  }
  , vega2: {
    name: 'vega2'
    , specType: 'vega'
    , spec: {
      data: [
        {
          name: 'data1'
          , source: 'demo-resource'
          , transform: [{type: 'test'}]
        }
      ]
    }
  }
  , vega3: {
    name: 'vega3'
    , specType: 'vega'
    , spec: {
      data: [
        {
          name: 'data1'
          , values: [{x:1,y:0}, {x:2,y:5}]
        }
        , {
          name: 'data2'
          , source: 'demo-resource'
        }
      ]
    }
  }
}

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
      title: mockDescriptor.resources[0].name
      , height: 450
      , xaxis: {
        title: 'Date'
      }
      , yaxis: {
        title: 'High'
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
      title: mockDescriptor.resources[0].name
      , height: 450
      , xaxis: {
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
      title: mockDescriptor.resources[0].name
      , height: 450
      , xaxis: {
        title: 'Date'
      }
      , yaxis: {
        title: 'High'
      }
    }
  }
}


describe('Data Package View utils', () => {
  it('should generate Plotly spec - lines', () => {
    const view = utils.compileView(mockViews.simple, mockDescriptor)
    const plotlySpec = utils.simpleToPlotly(view)
    expect(plotlySpec).toEqual(plotlyExpected.simple)
  })
  it('should generate Plotly spec - 2 lines', () => {
    const view = utils.compileView(mockViews.simple2, mockDescriptor)
    const plotlySpec = utils.simpleToPlotly(view)
    expect(plotlySpec).toEqual(plotlyExpected.simple2)
  })
  it('should generate Plotly spec - bar', () => {
    const view = utils.compileView(mockViews.simpleBar, mockDescriptor)
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
    const viewCompiled = utils.compileView(view, mockDescriptor)
    const outSpec = utils.handsOnTableToHandsOnTable(viewCompiled)
    const expected = {
      data: [
        [
          '2014-01-01'
          , 14.32
          , 14.59
        ]
        , [
          '2014-01-02'
          , 14.06
          , 14.22
        ]
        , [
          '2014-01-05'
          , 13.41
          , 14
        ]
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
      , manualColumnResize: true
    }
    // console.log(JSON.stringify(outSpec, null, 2));
    expect(outSpec).toEqual(expected)
  })

  it('should generate handsontable without data', () => {
    const view = {
      name: 'table-resource1'
      , resources: ['demo-resource']
      , specType: 'handsontable'
    }
    const viewCompiled = utils.compileView(view, mockDescriptorWithoutData)
    const outSpec = utils.handsOnTableToHandsOnTable(viewCompiled)
    const expected = {
      data: undefined
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
      , manualColumnResize: true
    }
    expect(outSpec).toEqual(expected)
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
    const expected = [ mockDescriptor.resources[0] ]
    let out = utils.compileData(view, mockDescriptor)
    expect(out).toEqual(expected)

    // check it works with resource index as well
    view = {
      resources: [0]
    }
    out = utils.compileData(view, mockDescriptor)
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
    const out = utils.compileView(mockViews.simple, mockDescriptor)
    expect(out.resources[0].format).toEqual('csv')
    expect(out.resources[0]._values.length).toEqual(3)
  })

  it('allResourcesLoaded works', () => {
    const out = utils.allResourcesLoaded(mockViews.vega3.spec.data, mockDescriptorWithoutData)
    expect(out).toBeFalsy()
    const out2 = utils.allResourcesLoaded(mockViews.vega3.spec.data, mockDescriptor)
    expect(out2).toBeTruthy()
  })
})

describe('getVegaSpec', () => {
  it('getVegaSpec works - vega spec without data property', () => {
    const out = utils.getVegaSpec(mockViews.vega1.spec, mockDescriptor)
    expect(out.data.length).toEqual(mockDescriptor.resources.length)
    expect(out.data[0].name).toEqual('demo-resource')
    expect(out.data[0].source).toEqual('demo-resource')
    expect(out.data[0].values[0].High).toEqual(14.59)
  })

  it('getVegaSpec works - vega spec with data property', () => {
    const out = utils.getVegaSpec(mockViews.vega2.spec, mockDescriptor)
    expect(out.data.length).toEqual(mockViews.vega2.spec.data.length)
    expect(out.data[0].values[0].High).toEqual(14.59)
    expect(out.data[0].transform).toEqual(mockViews.vega2.spec.data[0].transform)
  })

  it('getVegaSpec works - with one inlined and one not inlined data', () => {
    const out = utils.getVegaSpec(mockViews.vega3.spec, mockDescriptor)
    expect(out.data[0]).toEqual(mockViews.vega3.spec.data[0])
    expect(out.data[1].values[0].High).toEqual(14.59)
  })
})
