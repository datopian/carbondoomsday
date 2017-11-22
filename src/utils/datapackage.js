import fetch from 'isomorphic-fetch'
const Datapackage = require('datapackage').Datapackage
const {Table} = require('tableschema')


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
    const table = await Table.load(source, {schema: resource.descriptor.schema})
    return await table.read()
  }
}
