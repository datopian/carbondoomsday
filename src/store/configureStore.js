import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import update from '../reducers/datapackageReducer'

export default function configureStore(preloadedState) {
  return createStore(
    update,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}
