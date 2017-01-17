import 'babel-polyfill'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as actions from '../../../src/actions/datapackageActions'
import * as types from '../../../src/constants/actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let mock2 = nock('https://dp2.com')
              .persist()
              .get('/')
              .replyWithFile(200, './fixtures/dp2/datapackage.json')

describe('async actions', () => {

  it('creates RECEIVE_DATAPACKAGE when fetching datapackage is done', async () => {
    const store = mockStore({ dp: {} })
    await store.dispatch(actions.getDataPackage('https://dp2.com'))
    let receivedDp = store.getActions()
    expect(receivedDp[0]).toBeInstanceOf(Object)
    expect(receivedDp[0].type).toEqual('RECEIVE_DATAPACKAGE')
    expect(receivedDp[0].dp.title).toEqual('DEMO - CBOE Volatility Index')
    expect(receivedDp[0].dp.views[0].type).toEqual('Graph')
    expect(receivedDp[0].dp.resources).toBeInstanceOf(Array)
  })

  it('creates RECEIVE_RESOURCE when fetching resource is done', async () => {
    const store = mockStore({ resources: {} })
    await store.dispatch(actions.getDataPackage('https://dp2.com'))
    let receivedResource = store.getActions()
    expect(receivedResource[1]).toBeInstanceOf(Object)
    expect(receivedResource[1].type).toEqual('RECEIVE_RESOURCE')
    expect(receivedResource[1].resources).toBeInstanceOf(Array)
    expect(receivedResource[1].resources.length).toBeGreaterThan(1)
    expect(receivedResource[1].resources[0][1]).toEqual(14.32)
  })
  
})
