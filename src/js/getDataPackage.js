const Datapackage = require('datapackage-test').Datapackage
const Resource = require('datapackage-test').Resource

const getDataPackage = url => {
  return new Datapackage(url).then(dp => dp)
}

export default getDataPackage
