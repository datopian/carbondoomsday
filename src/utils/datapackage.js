import fetch from 'isomorphic-fetch'
const Datapackage = require('datapackage').Datapackage
const {File} = require('data.js')
const {Table} = require('tableschema')


export async function fetchDataOnly(resource) {
  if (resource.descriptor.format && resource.descriptor.format.includes('json')) {
    const response = await fetch(resource.source)
    return await response.json()
  } else {
    // Get the stream for CSV file
    const file = await File.load(resource.descriptor, {basePath: resource._basePath})
    let source
    if (file.descriptor.data) {
      source = file.descriptor.data
    } else {
      source = await file.stream()
    }
    // Instantiate table object and return rows as arrays
    // We could do it with File object, but we need to cast values
    const table = await Table.load(source, {schema: resource.descriptor.schema})
    return await table.read()
  }
}
