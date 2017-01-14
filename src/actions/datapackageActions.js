import fetch from 'isomorphic-fetch';
import * as actionTypes from "../constants/actionTypes"
import Papa from "papaparse"
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

export function getDataPackage(url) {
  return dispatch => {
    return new Datapackage(url).then(dp => {
        dispatch(receiveDatapackage(dp.descriptor))
      })
  }
}

export function fetchResource(csvUrl) {
  return dispatch => {
    return fetch(csvUrl)
      .then(response => response.text())
      .then(result => {
        result = Papa.parse(result)
        dispatch(receiveResource(result.data))
      })
  }
}
