import DataPackage from '../src/js/dataPackage.js';

const dpJson = {
  "name": "test",
  "resources": [
    {
      "name": "test",
      "format": "csv",
      "path": "test.csv"
    }
  ],
  "views": [
    {
      "type": "vegalite",
      "spec": {
        "data": {
          "resource": "test"
        },
        "mark": "bar",
        "encoding": {
          "x": {"field": "name", "type": "ordinal"},
          "y": {"field": "size", "type": "quantitative"}
        }
      }
    }
  ]
};

describe('DataPackage class instance', () => {

  it('should be an instance of DataPackage class', () => {
    let dp = new DataPackage(dpJson);
    expect(dp).toBeInstanceOf(DataPackage);
  });

  it('should have packageName attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.packageName).toBeDefined();
  });

  it('should have path attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.path).toBeDefined();
  });

  it('should have format attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.format).toBeDefined();
  });

  it('should have vlSpec attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.vlSpec).toBeDefined();
  });

  it('should have plotlySpec attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.plotlySpec).toBeDefined();
  });

  it('should build a resource path', () => {
    let dp = new DataPackage(dpJson);
    let path = dp.getResourcePath();
    expect(path).toMatch(DataPackageJsonUrl
      .replace("datapackage.json", dpJson.resources[0].path));
  });

});
