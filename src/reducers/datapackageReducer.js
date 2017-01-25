import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  datapackage: {},
  resources: []
};

export default function dataPackageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DATAPACKAGE:
      return Object.assign({}, state, Object.assign({}, state.dpr, {datapackage: action.dp}));

    case actionTypes.RECEIVE_RESOURCE: {
      let newResources =  _.concat(state.resources, action.resources);
      return Object.assign({}, state, Object.assign({}, state.dpr, {resources: newResources}));
    }
    default:
      return state;
  }
}
