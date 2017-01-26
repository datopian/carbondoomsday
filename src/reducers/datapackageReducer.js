import _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  datapackage: {},
  resources: [],
  metadata: {
    readme: ""
  }
};

export default function dataPackageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DATAPACKAGE:
      return Object.assign({}, state, Object.assign({}, state.dpr, {datapackage: action.dp}));

    case actionTypes.RECEIVE_RESOURCE: {
      let newResources =  _.concat(state.resources, action.resources);
      return Object.assign({}, state, Object.assign({}, state.dpr, {resources: newResources}));
    }
    case actionTypes.FETCH_PACKAGES_METADATA_SUCCESS:
      return Object.assign({}, state, Object.assign({}, state.dpr, {metadata: action.metadata}));
    default:
      return state;
  }
}
