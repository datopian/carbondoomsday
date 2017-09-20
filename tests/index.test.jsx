import index from '../src/index'
import ReactDOM from 'react-dom'
import MultiViews from '../src/containers/MultiViews'
import HandsOnTable from '../src/components/dataPackageView/HandsOnTable'
import LeafletMap from '../src/components/dataPackageView/LeafletMap'
import nock from 'nock'
import * as dprender from 'datapackage-render'


const mock = nock('https://dp-vix-resource-and-view.com/_v/latest')
              .persist()
              .get('/datapackage.json')
              .replyWithFile(200, './fixtures/dp-vix-resource-and-view/datapackage.json')
              .get('/data/demo-resource.csv')
              .replyWithFile(200, './fixtures/dp-vix-resource-and-view/data/demo-resource.csv')

const mock1 = nock('https://example-geojson.com/_v/latest')
                .persist()
                .get('/datapackage.json')
                .replyWithFile(200, './fixtures/example-geojson/datapackage.json')
                .get('/data/example.geojson')
                .replyWithFile(200, './fixtures/example-geojson/data/example.geojson')


describe('how renderView method works', () => {
  ReactDOM.render = jest.fn()
  afterEach(() => {
    ReactDOM.render.mockClear()
  })

  it('should render MultiViews if view/datahub/type is not preview', () => {
    const view = {name: 'normal-view'}
    const resource = {}
    const idx = null
    const dp = {name: 'test'}
    index.renderView(view, resource, idx, dp)
    expect(ReactDOM.render.mock.calls[0][0].type).toEqual(MultiViews)
    expect(ReactDOM.render.mock.calls[0][0].props).toEqual({"dataPackage": {"name": "test"}})
  })

  it('should render HandsOnTable if view/datahub/type is preview', () => {
    dprender.handsOnTableToHandsOnTable = jest.fn(() => 'hTspec')
    const view = {name: 'preview', datahub: {type: 'preview'}}
    const resource = {}
    const idx = 1
    const dp = {}
    index.renderView(view, resource, idx, dp)
    expect(ReactDOM.render.mock.calls[0][0].type).toEqual(HandsOnTable)
    expect(ReactDOM.render.mock.calls[0][0].props).toEqual({"idx": 1, "spec": "hTspec"})
  })

  // it('should render LeafletMap if element data-type=resource-preview and format=geojson', () => {
  //   dprender.findResourceByNameOrIndex = jest.fn(() => {
  //     return {format: 'geojson', _values: 'values'}
  //   })
  //   const divForResourcePreview = {dataset: {type: "resource-preview", resource: "0"}}
  //   index.renderComponentInElement(divForResourcePreview)
  //   expect(ReactDOM.render.mock.calls.length).toEqual(3)
  //   expect(ReactDOM.render.mock.calls[2][0].type).toEqual(LeafletMap)
  //   expect(ReactDOM.render.mock.calls[2][0].props).toEqual({featureCollection: 'values', idx: 0})
  //   expect(ReactDOM.render.mock.calls[2][1]).toEqual(divForResourcePreview)
  // })
})

// describe('how incrementally loading happens', () => {
//   it('should render first time after dp is fetched and second time when data is fetched', async () => {
//     index.renderComponentInElement = jest.fn()
//     const dpUrl = 'https://dp-vix-resource-and-view.com/_v/latest/datapackage.json'
//     const divForDataView = {dataset: {type: "view"}}
//     const divForResourcePreview = {dataset: {type: "resource"}}
//     await index.fetchDataPackageAndDataIncrementally(dpUrl, [divForDataView, divForResourcePreview])
//     // there are 1 view and 1 resource - each one renders twice
//     expect(index.renderComponentInElement.mock.calls.length).toEqual(4)
//     expect(index.renderComponentInElement.mock.calls[0][0]).toEqual(divForDataView)
//     expect(index.renderComponentInElement.mock.calls[1][0]).toEqual(divForResourcePreview)
//     expect(index.renderComponentInElement.mock.calls[2][0]).toEqual(divForDataView)
//     expect(index.renderComponentInElement.mock.calls[3][0]).toEqual(divForResourcePreview)
//   })
// })
//
// describe('render page for geojson data package', () => {
//   it('should render if no view component in datapackage', async () => {
//     index.renderComponentInElement = jest.fn()
//     const dpUrl = 'https://example-geojson.com/_v/latest/datapackage.json'
//     const divForDataView = {dataset: {type: "view"}}
//     const divForResourcePreview = {dataset: {type: "resource"}}
//     await index.fetchDataPackageAndDataIncrementally(dpUrl, [divForDataView, divForResourcePreview])
//     // there are only 1 resource - this one renders twice and render blank view div once
//     expect(index.renderComponentInElement.mock.calls.length).toEqual(4)
//     expect(index.renderComponentInElement.mock.calls[0][0]).toEqual(divForDataView)
//     expect(index.renderComponentInElement.mock.calls[1][0]).toEqual(divForResourcePreview)
//     expect(index.renderComponentInElement.mock.calls[2][0]).toEqual(divForDataView)
//     expect(index.renderComponentInElement.mock.calls[3][0]).toEqual(divForResourcePreview)
//   })
// })
