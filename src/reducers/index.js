import { combineReducers } from 'redux'
import datapackage from './datapackageReducer'

const rootReducer = combineReducers({
  dpr: datapackage
})

export default rootReducer
