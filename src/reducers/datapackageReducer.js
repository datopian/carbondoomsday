import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

export default function update(state = {
  datapackage: [],
  resources: []
}, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DATAPACKAGE:
      return Object.assign({}, state, {
        datapackage: action.datapackage
      })
    case actionTypes.RECEIVE_RESOURCE:
      return Object.assign({}, state, state.resources.push(action.resources))
    default:
      return state
  }
}
