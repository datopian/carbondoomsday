import * as actionTypes from "../constants/actionTypes";
import DataPackagePageApi from "../api/dataPackagePageApi";
import jts from "jsontableschema";
const Datapackage = require('datapackage-test').Datapackage;

export function receiveDatapackage(apiData) {
  return {
    type: actionTypes.RECEIVE_DATAPACKAGE,
    apiData
  };
}

export function receiveResource(resources) {
  return {
    type: actionTypes.RECEIVE_RESOURCE,
    resources
  };
}


export function getDataPackage(publisher, packageName) {
  return async dispatch => {
    return DataPackagePageApi.getPackageMetadata(publisher, packageName)
      .then(async (result) => {
        let data = result.data;

        let descriptor = data.descriptor;
        let readme = data.readme;
        let baseUrl = "https://bits.staging.datapackaged.com/metadata";
        let basePath = `${baseUrl}/${publisher}/${packageName}/_v/latest/`;
        const dp = await new Datapackage(descriptor, 'base', false, false, basePath);
        let dataset = [];
        for (let i = 0; i < dp.resources.length; i++) {
          const source = basePath + dp.resources[i].descriptor.path;
          const table = await getResourceTable(dp, i, source);
          const headers = await table.schema.headers;
          let data = await table.read();
          data.unshift(headers);
          dataset.push(data);
        }
        dispatch(receiveResource(dataset));
        dispatch(receiveDatapackage({
          descriptor: descriptor,
          readme: readme
        }));
      });
    };
  }

async function getResourceTable(dp, idx, source) {
  return await new jts.Table(dp.resources[idx].descriptor.schema, source);
}
