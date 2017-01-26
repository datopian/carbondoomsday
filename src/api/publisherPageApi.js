import axios from "axios";

axios.defaults.baseURL = 'https://staging.datapackaged.com';

const packages = {
  data:[
    {
      name: "finance-vix",
      title: "VIX - CBOE Volatility Index",
      description: "CBOE Volatility Index (VIX) time-series dataset including daily open, close,\nhigh and low. The CBOE Volatility Index (VIX) is a key measure of market\nexpectations of near-term volatility conveyed by S&P 500 stock index option\nprices introduced",
    },
    {
      name: "global-temp",
      title: "Global Temperature Time Series",
      description: "Global Temperature Time Series. Data are included from the GISS Surface Temperature (GISTEMP) analysis and the global component of Climate at a Glance (GCAG)",
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
