class ReclineView {

  constructor(dpJson) {
    //this.publisherName = dpJson.publisher;
    this.packageName = dpJson.name;
    this.path = dpJson.resources[0].path;
    this.format = dpJson.resources[0].format;
    this.vlSpec = {
      "width": 1080,
      "height": 500,
      "data": {
        //"url": this.getResourcePath(),
        //"format": {"type": this.format}
      },
      "mark": "line",
      "encoding": {
        "x": {
          "field": dpJson.views[0].state.group,
          "type": "temporal",
          "axis": {"ticks": 16}
        },
        "y": {
          "field": dpJson.views[0].state.series[0],
          "type": "quantitative"
        }
      },
      "config": {
        "timeFormat": "%b %Y"
      }
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
          "type": "date",
          "title": dpJson.views[0].state.group
        },
        "yaxis": {
          "type": "linear",
          "title": dpJson.views[0].state.series[0]
        }
      }
    };
  }

  getResourcePath() {
    //return '/api/package/' + this.publisherName + '/' + this.packageName + '/r/' + this.path;
    return DataPackageJsonUrl.replace("datapackage.json", this.path);
  }

}

export default ReclineView;
