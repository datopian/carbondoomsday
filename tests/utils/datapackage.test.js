import 'babel-polyfill'
import jts from 'jsontableschema'
import moment from 'moment-timezone'
import nock from 'nock'

import * as utils from '../../src/utils/datapackage'

const Datapackage = require('datapackage').Datapackage


const mock1 = nock('http://bit.do/datapackage-json')
              .persist()
              .get('')
              .replyWithFile(200, './fixtures/dp-inline-data/datapackage.json')

const mock2 = nock('https://dp-vix-resource-and-view.com')
              .persist()
              .get('/datapackage.json')
              .replyWithFile(200, './fixtures/dp-vix-resource-and-view/datapackage.json')
              .get('/data/demo-resource.csv')
              .replyWithFile(200, './fixtures/dp-vix-resource-and-view/data/demo-resource.csv')

const mock3 = nock('http://schemas.datapackages.org')
              .persist()
              .get('/registry.json')
              .replyWithFile(200, './fixtures/schemas/registry.json')
              .get('/data-package.json')
              .replyWithFile(200, './fixtures/schemas/data-package.json')
              .get('/tabular-data-package.json')
              .replyWithFile(200, './fixtures/schemas/tabular-data-package.json')
              .get('/fiscal-data-package.json')
              .replyWithFile(200, './fixtures/schemas/fiscal-data-package.json')


describe('get datapackage', () => {
  it('should load the datapackage.json', async () => {
    const descriptor = 'https://dp-vix-resource-and-view.com/datapackage.json'
    const dp = await new Datapackage(descriptor)

    expect(dp.valid).toBe(true)
    expect(dp.descriptor).toBeInstanceOf(Object)
    expect(dp.descriptor.views).toBeInstanceOf(Array)
    expect(dp.descriptor.views[0].type).toEqual('Graph')
    expect(dp.descriptor.resources).toBeInstanceOf(Array)
  })
})


describe('fetch it all', () => {
  it('should fetchDataPackageAndData', async () => {
    const dpUrl = 'https://dp-vix-resource-and-view.com/datapackage.json'
    const dp = await utils.fetchDataPackageAndData(dpUrl)

    expect(dp.descriptor.title).toEqual('DEMO - CBOE Volatility Index')
    expect(dp.resources.length).toEqual(1)
    const resource = dp.resources[0]
    expect(resource.descriptor.format).toEqual('csv')
    // Date,DEMOOpen,DEMOHigh,DEMOLow,DEMOClose
    // 2014-01-02,14.32,14.59,14.00,14.23
    const data = resource.descriptor._values
    expect(data.length).toEqual(651)
    // console.log(JSON.stringify(data[0], null, 2))
    const expected = [
      moment('2014-01-02').toISOString() // .format('YYYY-MM-DDTHH:mm:ss.SSS'), //tz('Europe/London').
      , 14.32
      , 14.59
      , '14.00'
      , 14.23
    ]
    expect(data[0][0].toISOString()).toEqual(expected[0])
    for (let count = 1; count < expected.length; count += 1) {
      expect(data[0][count]).toEqual(expected[count])
    }
  })
})

