import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import datapackage from './datapackageReducer'
import publisherPage from './publisherPageReducer'

const rootReducer = combineReducers({
  routing: routerReducer
  , dpr: datapackage
  , publisherPage
})

export default rootReducer
