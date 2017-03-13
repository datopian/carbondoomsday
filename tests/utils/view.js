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
})
