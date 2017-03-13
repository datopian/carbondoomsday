// Utilities and classes for working with Data Package Views
import { indexOf, find, zipObject } from 'lodash'

export function getResourceCachedValues(resource, rowsAsObjects=false) {
  if (rowsAsObjects) {
    var fieldNames = resource.schema.fields.map(field => {
      return field.name
    })
    return resource._values.map(row => {
      return zipObject(fieldNames, row)
    })
  } else {
    return resource._values;
  }
}


/**
 * Convert a view using a simple graph spec to plotly spec for rendering
 * @param {View} view descriptor with compiled in data
 * @return {Object} Plotly spec
 */
export function simpleToPlotly(view) {
  const simpleGraphTypesToPlotly = {
    line: {
      type: 'scatter'
      , mode: 'lines'
      , line: {
        width: 2
        , shape: 'spline'
      }
    }
    , bar: {
      type: 'bar'
    }
    , scatter: {
      type: 'scatter'
    }
  }
  const rowsAsObjects = true
  const rows = getResourceCachedValues(view.resources[0], rowsAsObjects)
  const xValues = rows.map(row => row[view.spec.group])
  // generate the plotly series
  // { 'x': ..., 'y': ..., 'type': ...}
  const data = view.spec.series.map((serie) => {
    const out = {
      x: xValues
      , y: rows.map(row => row[serie])
      , name: serie
    }
    Object.assign(out, simpleGraphTypesToPlotly[view.spec.type])
    return out
  })

  const plotlySpec = {
    data
    , layout: {
      title: view.resources[0].name
      , xaxis: {
        title: view.spec.group
      }
    }
  }
  if(view.spec.series.length === 1) {
    plotlySpec.layout.yaxis = {
      title: view.spec.series[0]
    }
  }
  return plotlySpec
}


/**
 * Convert a [handson]table view to HandsOnTable spec
 * @param {View} view descriptor with compiled in data
 * @return {Object} HandsOnTable spec
 */
export function handsOnTableToHandsOnTable(view) {
  const headers = view.resources[0].schema.fields.map(field => field.name)
  const data = getResourceCachedValues(view.resources[0])
  let height = null
  if (data && data.length > 16) {
    height = 432
  }
  return {
    data
    , colHeaders: headers
    , readOnly: true
    , width: 1136
    , height
    , colWidths: 47
    , rowWidth: 27
    , stretchH: 'all'
    , columnSorting: true
    , search: true
  }
}

/**
 * Ensure view spec is in "normal" form - i.e. has all the standard fields (esp
 * the resources attribute)
 * @param {View} viewSpec (note: Changes the viewSpec in place)
 */
export function normalizeView(viewSpec) {
  if (!viewSpec.resources) {
    viewSpec.resources = [0]
  }
}

/**
 * convert old Recline "view" to DP View with simple graph spec
 * @param {View} reclineViewSpec
 */
export function convertReclineToSimple(reclineViewSpec) {
  const graphTypeConvert = {
    lines: 'line'
  }
  // TODO: support multiple series
  const out = {
    name: reclineViewSpec.id.toLowerCase()
    , specType: 'simple'
    , spec: {
      type: graphTypeConvert[reclineViewSpec.state.graphType]
        , group: reclineViewSpec.state.group
        , series: reclineViewSpec.state.series
    }
  }
  return out
}

/**
 * compile together resources needed for this view based on its data source spec
 * @param {View} view descriptor
 * @param {dataPackage} parent data package - used for resolving the resources
 * @return {Array} An array of resources with their data inlined
 */
export function compileData(view, dataPackage) {
  const out = view.resources.map((resourceId) => {
    const resource = Object.assign({}, findResourceByNameOrIndex(dataPackage, resourceId))
    return resource
  })
  return out
}

export function findResourceByNameOrIndex(dp, nameOrIndex) {
  if (typeof (nameOrIndex) == 'number') {
    return dp.resources[nameOrIndex]
  } else {
    return find(dp.resources, resource => (resource.name == nameOrIndex))
  }
}


/**
 * Prepare a view for conversion to a renderable spec (normalize it and compile in data)
 * Params as for compileData
 * @return {Object} "compiled" view - normalized and with data inline
 */
export function compileView(inView, dataPackage) {
  const view = Object.assign({}, inView)
  normalizeView(view)
  const compiledData = compileData(view, dataPackage)
  view.resources = compiledData
  return view
}
