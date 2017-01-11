const Datapackage = require('datapackage-test').Datapackage

async function getDataPackage(url) {
  //return new Datapackage(url).then(dp => dp)
  const dp = await new Datapackage(url)
  const table = await dp.resources[0].table
  const data = await table.read()
  return data
}

export default getDataPackage
