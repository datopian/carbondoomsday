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

describe('DataPackage class', () => {

  it('should be an instance of DataPackage class', () => {
    let dp = new DataPackage(dpJson);
    expect(dp).toBeInstanceOf(DataPackage);
  });

  it('should have attributes', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.packageName).toBeDefined();
    expect(dp.path).toBeDefined();
    expect(dp.format).toBeDefined();
    expect(dp.spec).toBeDefined();
  });

  it('should build a resource path', () => {
    let dp = new DataPackage(dpJson);
    let path = dp.getResourcePath();
    expect(path).toMatch(/fixtures\/dp1\/+\w+.csv/i);
  });

});
