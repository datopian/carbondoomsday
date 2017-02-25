import * as actionTypes from '../constants/actionTypes'
import DataPackagePageApi from '../api/dataPackagePageApi'

const Datapackage = require('datapackage').Datapackage

export function receiveDatapackage(apiData) {
  return {
    type: actionTypes.RECEIVE_DATAPACKAGE
    , apiData
  }
}

export function receiveResource(resources) {
  return {
    type: actionTypes.RECEIVE_RESOURCE
    , resources
  }
}


export function getDataPackage(publisher, packageName) {
  return async dispatch => DataPackagePageApi.getPackageMetadata(publisher, packageName)
      .then(async (result) => {
        const data = result.data

        const descriptor = data.descriptor
        const readme = data.readme
        const baseUrl = 'https://bits.staging.datapackaged.com/metadata'
        const basePath = `${baseUrl}/${publisher}/${packageName}/_v/latest/`
        const dp = await new Datapackage(descriptor, 'base', false, false, basePath)
        const dataset = []
        for (let i = 0; i < dp.resources.length; i++) {
          const table = await dp.resources[i].table
          const headers = table.schema.headers
          const data = await table.read()
          data.unshift(headers)
          dataset.push(data)
        }
        dispatch(receiveResource(dataset))
        dispatch(receiveDatapackage({
          descriptor
          , readme
        }))
      })
}

