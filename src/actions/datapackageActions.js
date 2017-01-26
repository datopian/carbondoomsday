import * as actionTypes from "../constants/actionTypes";
import DataPackagePageApi from "../api/dataPackagePageApi";
const Datapackage = require('datapackage-test').Datapackage;
import jts from 'jsontableschema';

export function receiveDatapackage(dp) {
  return {
    type: actionTypes.RECEIVE_DATAPACKAGE,
    dp
  };
}

export function receiveResource(resources) {
  return {
    type: actionTypes.RECEIVE_RESOURCE,
    resources
  };
}

export function getDataPackageMetaDataSuccess(metadata) {
  return {
    type: actionTypes.FETCH_PACKAGES_METADATA_SUCCESS,
    metadata
  };
}

export function getDataPackage(descriptor) {
  return async dispatch => {
    const basePath = descriptor.replace('datapackage.json', '');
    const dp = await new Datapackage(descriptor,'base',false,false,null);
    let dataset = [];
    for(let i=0; i<dp.resources.length; i++) {
      const source = basePath + dp.resources[i].descriptor.path;
      const table = await getResourceTable(dp,i,source);
      const headers = await table.schema.headers;
      let data = await table.read();
      data.unshift(headers);
      dataset.push(data);
    }
    dispatch(receiveResource(dataset));
    dispatch(receiveDatapackage(dp.descriptor));
  };
}

export function getDataPackageMetaData(publisher, pack) {
  return dispatch => {
    return DataPackagePageApi.getPackageMetadata(publisher, pack)
      .then(result => dispatch(getDataPackageMetaDataSuccess(result.data)));
  };
}

async function getResourceTable(dp,idx,source) {
  return await new jts.Table(dp.resources[idx].descriptor.schema, source);
}
