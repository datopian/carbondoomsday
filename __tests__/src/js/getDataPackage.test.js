import getDataPackage from '../../../src/js/getDataPackage.js'

describe('getDataPackage function', () => {
  it('should load the datapackage.json and return ...', () => {
    let dpUrl = 'some url here'
    let dp = getDataPackage(dpUrl)
    expect(dp.valid).toBe(true)
    expect(dp.descriptor).toBeDefined() //redo after trying out the library
    expect(dp.resources).toBeInstanceOf(Array)
  })
})
