import getDataResource from '../../../src/js/getDataResource.js'
import getDataPackage from '../../../src/js/getDataPackage.js'

describe('getDataResource function', () => {
  it('should load array of resources and return data', () => {
    return getDataPackage(remoteUrl)
      .then(dp => {
        console.log(dp.resources)
        getDataResource(dp.resources)
        //expect(data).toBeInstanceOf(Array)
        //expect(data.length).toBeGreaterThan(0)
        //expect(data[0]) test for field names
      })
  })
})
