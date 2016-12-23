class DataPackage {

  constructor(dpJson) {
    //this.publisherName = dpJson.publisher;
    this.packageName = dpJson.name;
    this.path = dpJson.resources[0].path;
    this.format = dpJson.resources[0].format;
    this.vlSpec = dpJson.views[0].spec;
    this.vlSpec.data = {
      //"url": this.getResourcePath(),
      //"format": {"type": this.format}
    };
    this.vlSpec.config = {
      "timeFormat": "%b %Y"
    };
    this.plotlySpec = {
      "data": [{
        "x": [],
        "y": [],
        "line": { "width": 1 },
        "type": "scatter"
      }],
      "layout": {
        "xaxis": {
          "title": dpJson.views[0].spec.encoding.x.field
        },
        "yaxis": {
          "type": "linear",
          "title": dpJson.views[0].spec.encoding.y.field
        }
      }
    };
  }

  getResourcePath() {
    //return '/api/package/' + this.publisherName + '/' + this.packageName + '/r/' + this.path;
    return DataPackageJsonUrl.replace("datapackage.json", this.path);
  }

}

export default DataPackage;
