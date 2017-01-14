import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  datapackage: {},
  resources: []
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DATAPACKAGE:
      return Object.assign({}, state, {
        datapackage: action.dp
      })
    case actionTypes.RECEIVE_RESOURCE:
      return Object.assign({}, state, state.resources.push(action.resources))
    default:
      return state
  }
}
