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
  return async (dispatch) => {
    const basePath = 'http://' + descriptor.replace('datapackage.json', '')
    console.log(basePath)
    const dp = await new Datapackage(descriptor, 'base', true, false, basePath)
    dispatch(receiveDatapackage(dp.descriptor))
    const table = await dp.resources[0].table
    const data = await table.read()
    dispatch(receiveResource(data))
  }
}
