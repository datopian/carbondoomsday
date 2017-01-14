const Datapackage = require('datapackage-test').Datapackage

export default function getDataPackage(url) {
  return new Datapackage(url)
}
