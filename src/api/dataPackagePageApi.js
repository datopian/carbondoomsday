import axios from 'axios'

class DataPackagePageApi {

  static getPackageMetadata(publisher, pack) {
    return axios.get(`https://staging.datapackaged.com/api/package/${publisher}/${pack}`)
  }

}
export default DataPackagePageApi

