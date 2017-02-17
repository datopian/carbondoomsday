import * as types from '../constants/actionTypes'

const initialState = {
  data: []
  , details: {}
}

export default function publisherPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PACKAGES_SUCCESS:
      return Object.assign({}, state, Object.assign({}, state.publisherPage, { data: action.packages }))
    case types.FETCH_PUB_DETAILS_SUCCESS:
      return Object.assign({}, state, Object.assign({}, state.publisherPage, { details: action.details }))
    default:
      return state
  }
}
