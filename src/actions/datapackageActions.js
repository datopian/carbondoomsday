import 'babel-polyfill'
import * as actionTypes from "../constants/actionTypes"
const Datapackage = require('datapackage-test').Datapackage

export function receiveDatapackage(dp) {
  return {
    type: actionTypes.RECEIVE_DATAPACKAGE,
    dp
  }
}

export function receiveResource(resources) {
  return {
    type: actionTypes.RECEIVE_RESOURCE,
    resources
  }
}

export function getDataPackage(descriptor) {
  return async dispatch => {
    const basePath = 'http://' + descriptor.replace('datapackage.json', '')
    const dp = await new Datapackage(descriptor, 'base', true, false, basePath)
    const table = await dp.resources[0].table
    const headers = await table.schema.headers
    let data = await table.read()
    data.unshift(headers)
    dispatch(receiveResource(data))
    dispatch(receiveDatapackage(dp.descriptor))
  }
}
