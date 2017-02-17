import 'babel-polyfill'
import jts from 'jsontableschema'
import nock from 'nock'

const Datapackage = require('datapackage-test').Datapackage

const mock1 = nock('http://bit.do/datapackage-json')
              .persist()
              .get('')
              .replyWithFile(200, './fixtures/dp4/datapackage.json')

const mock2 = nock('https://dp2.com')
              .persist()
              .get('/')
              .replyWithFile(200, './fixtures/dp2/datapackage.json')
              .get('/fixtures/data/demo-resource.csv')
              .replyWithFile(200, './fixtures/dp2/data/demo-resource.csv')


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
    const descriptor = 'https://dp2.com'
    const dp = await new Datapackage(descriptor)

    expect(dp.valid).toBe(true)
    expect(dp.descriptor).toBeInstanceOf(Object)
    expect(dp.descriptor.views).toBeInstanceOf(Array)
    expect(dp.descriptor.views[0].type).toEqual('Graph')
    expect(dp.descriptor.resources).toBeInstanceOf(Array)
  })
})

describe('getDataResource function', () => {
  it('should load inline resource', async () => {
    const descriptor = 'http://bit.do/datapackage-json'
    const dp = await new Datapackage(descriptor)
    const table = await dp.resources[0].table
    const data = await table.read()
    expect(data[0][0]).toEqual(180)
  })

  it('should load resource from URL', async () => {
    const descriptor = 'https://dp2.com'
    const basePath = 'fixtures/dp2'
    const dp = await new Datapackage(descriptor, 'base', true, false, basePath)
    const table = await dp.resources[0].table
    const data = await table.read()
    expect(data[0][1]).toEqual(14.32)
  })
})

describe('playing with datapackage', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  it('works hooray', async () => {
    const url = 'https://raw.githubusercontent.com/frictionlessdata/dpr-js/gh-pages/fixtures/dp2/datapackage.json'
    const basePath = url.replace('datapackage.json', '')
    const dp = await new Datapackage(url)
    expect(dp.descriptor.title).toEqual('DEMO - CBOE Volatility Index')
    const dataset = []
    for (let i = 0; i < dp.resources.length; i++) {
      const source = basePath + dp.resources[i].descriptor.path
      const table = await new jts.Table(dp.resources[i].descriptor.schema, source)
      const data = await table.read()
      dataset.push(data)
    }
    expect(dataset.length).toEqual(dp.resources.length)
  })
})
