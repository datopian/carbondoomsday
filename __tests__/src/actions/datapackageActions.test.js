import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../src/actions/datapackageActions'
import * as types from '../../../src/constants/actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  it('creates RECEIVE_DATAPACKAGE when fetching datapackage is done', () => {
    const store = mockStore({ dp: {} })
    return store.dispatch(actions.getDataPackage(remoteDpUrl))
      .then(() => {
        let receivedDp = store.getActions()
        expect(receivedDp).toBeInstanceOf(Array)
        expect(receivedDp[0]).toBeInstanceOf(Object)
        expect(receivedDp[0].type).toEqual('RECEIVE_DATAPACKAGE')
        expect(receivedDp[0].dp).toBeInstanceOf(Object)
        expect(receivedDp[0].dp.description).toBeDefined()
        expect(receivedDp[0].dp.resources).toBeInstanceOf(Array)
        expect(receivedDp[0].dp.views).toBeInstanceOf(Array)
      })
  })

  it('creates RECEIVE_RESOURCE when fetching resource is done', () => {
    const store = mockStore({ resources: {} })
    return store.dispatch(actions.fetchResource(remoteCsvUrl))
      .then(() => {
        let receivedResource = store.getActions()
        expect(receivedResource).toBeInstanceOf(Array)
        expect(receivedResource[0]).toBeInstanceOf(Object)
        expect(receivedResource[0].type).toEqual('RECEIVE_RESOURCE')
        expect(receivedResource[0].resources).toBeInstanceOf(Array)
        expect(receivedResource[0].resources.length).toBeGreaterThan(1)
      })
  })
})
