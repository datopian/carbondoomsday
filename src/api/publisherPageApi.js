import axios from "axios";

class PublisherPageApi {
  static getAllPackages(publisher) {
    return axios.get(`https://staging.datapackaged.com/api/search/package?q=* publisher:${publisher}`);
  }

  static getPublisherDetails(publisher) {
    return axios.get(`https://staging.datapackaged.com/api/profile/publisher/${publisher}`);
  }
}

export default PublisherPageApi;
