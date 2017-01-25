import * as actionTypes from "../constants/actionTypes";
import PublisherPageApi from "../api/publisherPageApi";

export function getAllPackageForPublisherSuccess(packages) {
  return {
    type: actionTypes.FETCH_PACKAGES_SUCCESS,
    packages: packages.data
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
    return PublisherPageApi.getAllPackages(publisherName).then(packages => {
      dispatch(getAllPackageForPublisherSuccess(packages));
    }).catch(error => {
      throw(error);
    });
      // .then(result => dispatch(getAllPackageForPublisherSuccess(result.data)));
  };
}

export function getPublisherDetails(publisherName) {
  return dispatch => {
    return PublisherPageApi.getPublisherDetails(publisherName).then(details => {
      dispatch(getPublisherDetailsSuccess(details));
    }).catch(error => {
      throw(error);
    });
    // .then(result => dispatch(getAllPackageForPublisherSuccess(result.data)));
  };
}


