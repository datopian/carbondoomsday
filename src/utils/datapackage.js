const Datapackage = require('datapackage').Datapackage


export async function fetchDataPackageAndData(dataPackageIdentifier) {
  const dp = await new Datapackage(dataPackageIdentifier)
  await Promise.all(dp.resources.map(async resource => {
    // we assume resource is tabular for now ...
    const table = await resource.table
    // NOTE: returns rows as arrays. If want objects (keyed by headers) set
    // first arg to true
    resource.descriptor._values = await table.read()
  }))
  return dp
}

