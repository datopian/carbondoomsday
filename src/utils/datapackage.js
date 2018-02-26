import fetch from 'isomorphic-fetch'
const Datapackage = require('datapackage').Datapackage
const {Table} = require('tableschema')
const {cloneDeep} = require('lodash')


export async function fetchDataOnly(resource) {
  if (resource.descriptor.format && resource.descriptor.format.includes('json')) {
    if (resource.inline) {
      return resource.descriptor.data
    } else {
      const response = await fetch(resource.source)
      return await response.json()
    }
  } else {
    // Check if data is inlined - this helps us to resolve unavailable in browser functions
    let source
    if (resource.inline) {
      source = resource.descriptor.data
    } else {
      source = resource.source
    }
    // Instantiate table object and return rows as arrays
    // Don't cast values for 'array', 'object' and 'yearmonth' types because
    // we want to render them as raw values + casted values rendered incorrectly:
    const tempSchema = cloneDeep(resource.descriptor.schema)
    tempSchema.fields.map(field => {
      const dateType = ['array', 'object', 'yearmonth']
      if (dateType.includes(field.type)) {
        field.type = 'string'
      }
      return field
    })
    const table = await Table.load(source, {schema: tempSchema})
    return await table.read()
  }
}
