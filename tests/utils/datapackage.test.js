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

const mock5 = nock('https://topo-json-resource-and-view.com')
              .persist()
              .get('/datapackage.json')
              .replyWithFile(200, './fixtures/example-topojson/datapackage.json')
              .get('/data/example.json')
              .replyWithFile(200, './fixtures/example-topojson/data/example.json')

const mock6 = nock('https://dp-resource-with-no-format.com')
              .persist()
              .get('/datapackage.json')
              .replyWithFile(200, './fixtures/example-no-format/datapackage.json')
              .get('/data/cities-month.csv')
              .replyWithFile(200, './fixtures/example-no-format/data/cities-month.csv')


describe('fetch data only', () => {
  it('takes a resource and fetches data', async () => {
    const descriptor = 'https://dp-vix-resource-and-view.com/datapackage.json'
    const dp = await new Datapackage(descriptor)
    const resource = dp.resources[0]
    const values = await utils.fetchDataOnly(resource)
    expect(values[0][1]).toEqual(14.32)
  })

  it('should get topojson data', async () => {
    const dpUrl = 'https://topo-json-resource-and-view.com/datapackage.json'
    const dp = await new Datapackage(dpUrl)
    const resource = dp.resources[0]
    const values = await utils.fetchDataOnly(resource)
    expect(dp.descriptor.title).toEqual('Example TopoJSON Data Package')
    expect(dp.resources.length).toEqual(1)
    expect(values.type).toEqual("Topology")
  })

  it('if there is no format it should assume it is a tabular data', async () => {
    const descriptor = 'https://dp-resource-with-no-format.com/datapackage.json'
    const dp = await new Datapackage(descriptor)
    const resource = dp.resources[0]
    const values = await utils.fetchDataOnly(resource)
    expect(dp.resources[0]._descriptor.schema.fields.length).toEqual(24)
  })
})
