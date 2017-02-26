const Datapackage = require('datapackage').Datapackage


export async function fetchDataPackageAndData(dataPackageIdentifier) {
  const dp = await new Datapackage(dataPackageIdentifier)
  await Promise.all(dp.resources.map(async resource => {
    // we assume resource is tabular for now ...
    const table = await resource.table
    // rows are simple arrays -- we can convert to objects elsewhere as needed
    let rowsAsObjects = false 
    resource.descriptor._values = await table.read(rowsAsObjects)
  }))
  return dp
}

