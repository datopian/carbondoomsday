class DataPackage {

  constructor(dpJson) {
    //this.publisherName = dpJson.publisher;
    this.packageName = dpJson.name;
    this.path = dpJson.resources[0].path;
    this.format = dpJson.resources[0].format;
    this.spec = {
      "mark": dpJson.views[0].spec.mark,
      "encoding": dpJson.views[0].spec.encoding
    };
  }

  getResourcePath() {
    //return '/api/package/' + this.publisherName + '/' + this.packageName + '/r/' + this.path;
    return "fixtures/dp1/" + this.path;
  }

}

export default DataPackage;
