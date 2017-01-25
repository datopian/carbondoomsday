import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import expect from "expect";
import * as actions from '../../../src/actions/datapackageActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

let mock2 = nock('https://dp2.com')
              .persist()
              .get('/')
              .replyWithFile(200, './fixtures/dp2/datapackage.json')

describe('async actions', () => {

  it('creates RECEIVE_DATAPACKAGE when fetching datapackage is done', async () => {
    const store = mockStore({ dp: {} });
    await store.dispatch(actions.getDataPackage('https://raw.githubusercontent.com/frictionlessdata/dpr-js/gh-pages/fixtures/dp2/datapackage.json'));
    let receivedDp = store.getActions();
    expect(receivedDp[1]).toBeInstanceOf(Object);
    expect(receivedDp[1].type).toEqual('RECEIVE_DATAPACKAGE');
    expect(receivedDp[1].dp.title).toEqual('DEMO - CBOE Volatility Index');
    expect(receivedDp[1].dp.views[0].type).toEqual('Graph');
    expect(receivedDp[1].dp.resources).toBeInstanceOf(Array);
  });

  it('creates RECEIVE_RESOURCE when fetching resource is done', async () => {
    const store = mockStore({ resources: {} });
    await store.dispatch(actions.getDataPackage('https://raw.githubusercontent.com/frictionlessdata/dpr-js/gh-pages/fixtures/dp2/datapackage.json'));
    let receivedResource = store.getActions();
    expect(receivedResource[0]).toBeInstanceOf(Object);
    expect(receivedResource[0].type).toEqual('RECEIVE_RESOURCE');
    expect(receivedResource[0].resources).toBeInstanceOf(Array);
    expect(receivedResource[0].resources[0].length).toBeGreaterThan(1);
    expect(receivedResource[0].resources[0][0][4]).toEqual('DEMOClose');
    expect(receivedResource[0].resources[0][1][1]).toEqual(14.32);
  });

});
