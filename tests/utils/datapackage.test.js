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

const mock4 = nock('https://geo-json-resource-and-view.com')
              .persist()
              .get('/datapackage.json')
              .replyWithFile(200, './fixtures/example-geojson/datapackage.json')
              .get('/data/example.geojson')
              .replyWithFile(200, './fixtures/example-geojson/data/example.geojson')


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
      moment('2014-01-02').toISOString()
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

  it('should get geojson data', async () => {
    const dpUrl = 'https://geo-json-resource-and-view.com/datapackage.json'
    const dp = await utils.fetchDataPackageAndData(dpUrl)
    expect(dp.descriptor.title).toEqual('Example Geo (JSON) Data Package')
    expect(dp.resources.length).toEqual(1)
    const resource = dp.resources[0]
    expect(resource.descriptor.format).toEqual('geojson')
    const data = resource.descriptor._values
    expect(data.type, 'FeatureCollection')
    for (let count = 0; count < data.features.length; count += 1) {
      expect(data.features[count].type, 'Feature')
    }
  })
})

describe('fetch data only', () => {
  it('takes a resource and fetches data', async () => {
    const descriptor = 'https://dp-vix-resource-and-view.com/datapackage.json'
    const dp = await new Datapackage(descriptor)
    const resource = dp.resources[0]
    const values = await utils.fetchDataOnly(resource)
    expect(values[0][1]).toEqual(14.32)
  })
})
