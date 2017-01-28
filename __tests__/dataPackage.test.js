import DataPackage from '../src/js/dataPackage';
import expect from "expect";

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
    expect(dp).toBeA(DataPackage);
  });

  it('should have packageName attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.packageName).toExist();
  });

  it('should have path attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.path).toExist();
  });

  it('should have format attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.format).toExist();
  });

  it('should have vlSpec attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.vlSpec).toExist();
  });

  it('should have plotlySpec attribute', () => {
    let dp = new DataPackage(dpJson);
    expect(dp.plotlySpec).toExist();
  });
});
