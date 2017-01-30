import * as actionTypes from "../constants/actionTypes";
import PublisherPageApi from "../api/publisherPageApi";

export function getAllPackageForPublisherSuccess(packages) {
  return {
    type: actionTypes.FETCH_PACKAGES_SUCCESS,
    packages: packages.items
  };
}

export function getPublisherDetailsSuccess(details) {
  return {
    type: actionTypes.FETCH_PUB_DETAILS_SUCCESS,
    details: details.data
  };
}

export function getAllPackageForPublisher(publisherName) {
  return dispatch => {
    return PublisherPageApi.getAllPackages(publisherName).then(result => {
      dispatch(getAllPackageForPublisherSuccess(result.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function getPublisherDetails(publisherName) {
  return dispatch => {
    return PublisherPageApi.getPublisherDetails(publisherName).then(result => {
      dispatch(getPublisherDetailsSuccess(result.data));
    }).catch(error => {
      throw(error);
    });
  };
}


