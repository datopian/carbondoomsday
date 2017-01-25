import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import datapackage from "./datapackageReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  dpr: datapackage
});

export default rootReducer;
