import _ from 'lodash'
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  descriptor: {}
  , resources: []
  , readme: ''
}

export default function dataPackageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DATAPACKAGE:
      return Object.assign({}, state, Object.assign({}, state.dpr, {
        descriptor: action.apiData.descriptor
        , readme: action.apiData.readme
      }))

    case actionTypes.RECEIVE_RESOURCE: {
      const newResources = _.concat(state.resources, action.resources)
      return Object.assign({}, state, Object.assign({}, state.dpr, { resources: newResources }))
    }
    default:
      return state
  }
}
