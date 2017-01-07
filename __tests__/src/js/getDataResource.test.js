import getDataResource from '../../../src/js/getDataResource.js'

describe('getDataResource function', () => {
  it('should load the resources and return data', () => {
    let arrayOfResources = [] //array of Resource class objects
    let data = getDataResource(arrayOfResources)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    //expect(data[0]) test for field names
  })
})
