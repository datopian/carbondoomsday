import fetch from 'isomorphic-fetch';
const Datapackage = require('datapackage').Datapackage


export async function fetchDataPackageAndData(dataPackageIdentifier) {
  const dp = await new Datapackage(dataPackageIdentifier)
  await Promise.all(dp.resources.map(async (resource) => {
    if (resource.descriptor.format === 'geojson') {
      const baseUrl = resource._basePath.replace('/datapackage.json', '')
      const resourceUrl = `${baseUrl}/${resource._descriptor.path}`
      const response = await fetch(resourceUrl)
      resource.descriptor._values = await response.json()
    } else {
      // we assume resource is tabular for now ...
      const table = await resource.table
      // rows are simple arrays -- we can convert to objects elsewhere as needed
      const rowsAsObjects = false
      resource.descriptor._values = await table.read(rowsAsObjects)
    }
  }))
  return dp
}

export async function fetchDataOnly(resource) {
  if (resource.descriptor.format === 'geojson') {
    const baseUrl = resource._basePath.replace('/datapackage.json', '')
    const resourceUrl = `${baseUrl}/${resource._descriptor.path}`
    const response = await fetch(resourceUrl)
    return await response.json()
  } else {
    // we assume resource is tabular for now ...
    const table = await resource.table
    // rows are simple arrays -- we can convert to objects elsewhere as needed
    const rowsAsObjects = false
    return await table.read(rowsAsObjects)
  }
}
