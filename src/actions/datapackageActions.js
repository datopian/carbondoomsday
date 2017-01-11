import * as actionTypes from "../constants/actionTypes"

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

export async function getDataPackage(url) {
  return dispatch => {
    const dp = await new Datapackage(url)
    dispatch(receiveDatapackage(dp.descriptor))
  }
}

/*
export function fetchResource(csvUrl) {
  return dispatch => {
    return fetch(csvUrl)
      .then(response => response.text())
      .then(result => dispatch(receiveResource(result)))
  }
}
*/
