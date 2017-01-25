import axios from "axios";

axios.defaults.baseURL = 'https://staging.datapackaged.com';

const packages = {
  data:[
    {
      name: "one",
      description: "This is package one",
      url: "/core/one"
    },
    {
      name: "two",
      description: "This is package two",
      url: "/core/two"
    },
    {
      name: "three",
      description: "This is package three",
      url: "/core/three"
    }
  ]
};

const publisherDetails = {
  data : {
    name: 'core',
    title: 'The core Publisher',
    joined: '2017-1-1 12:4:4'
  }
};

class PublisherPageApi {
  static getAllPackages(publisher) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], packages));
      }, 100);
    });
    // return axios.get('/api/package/'+publisher);
  }

  static getPublisherDetails(publisher) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, publisherDetails));
      }, 100);
    });
    // return axios.get('/api/package/'+publisher);
  }
}

export default PublisherPageApi;
