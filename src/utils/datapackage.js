import fetch from 'isomorphic-fetch';
const Datapackage = require('datapackage').Datapackage

// NOTE: currently unused and deprecated because its functionality moved into src/index.jsv
export async function fetchDataPackageAndData(dataPackageIdentifier) {
  const dp = await new Datapackage(dataPackageIdentifier)
  await Promise.all(dp.resources.map(async (resource) => {
    resource.descriptor._values = await fetchDataOnly(resource)
  }))
  return dp
}

export async function fetchDataOnly(resource) {
  if (resource.descriptor.format && resource.descriptor.format.includes('json')) {
    const response = await fetch(resource.source)
    return await response.json()
  } else {
    // we assume resource is tabular for now ...
    const table = await resource.table
    // rows are simple arrays -- we can convert to objects elsewhere as needed
    const rowsAsObjects = false
    return await table.read(rowsAsObjects)
  }
}
