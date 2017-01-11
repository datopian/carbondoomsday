import getDataPackage from '../../../src/js/getDataPackage.js'

describe('getDataPackage function', () => {
  pit('should load the datapackage.json and return a promise', () => {
    return getDataPackage(remoteUrl)
      .then(dp => {
        expect(dp.valid).toBe(true)
        expect(dp.descriptor).toBeInstanceOf(Object)
        expect(dp.descriptor.views).toBeInstanceOf(Array)
        expect(dp.descriptor.views[0]).toBeInstanceOf(Object)
        expect(dp.descriptor.views[0].state).toBeInstanceOf(Object)
        expect(dp.descriptor.resources).toBeInstanceOf(Array)
        expect(dp.resources).toBeInstanceOf(Array)
      })
  })
})
