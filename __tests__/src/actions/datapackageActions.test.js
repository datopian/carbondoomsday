import 'babel-polyfill';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import expect from "expect";
import * as actions from '../../../src/actions/datapackageActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  let timeout;

  beforeAll(function() {
    timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
  });

  it('creates RECEIVE_DATAPACKAGE when fetching datapackage is done', async () => {
    const store = mockStore({ dp: {} });
    await store.dispatch(actions.getDataPackage('https://raw.githubusercontent.com/frictionlessdata/dpr-js/gh-pages/fixtures/dp2/datapackage.json'));
    let receivedDp = store.getActions();
    expect(receivedDp[1]).toBeA(Object);
    expect(receivedDp[1].type).toEqual('RECEIVE_DATAPACKAGE');
    expect(receivedDp[1].dp.title).toEqual('DEMO - CBOE Volatility Index');
    expect(receivedDp[1].dp.views[0].type).toEqual('Graph');
    expect(receivedDp[1].dp.resources).toBeA(Array);
  });

  it('creates RECEIVE_RESOURCE when fetching resource is done', async () => {
    const store = mockStore({ resources: {} });
    await store.dispatch(actions.getDataPackage('https://raw.githubusercontent.com/frictionlessdata/dpr-js/gh-pages/fixtures/dp2/datapackage.json'));
    let receivedResource = store.getActions();
    expect(receivedResource[0]).toBeA(Object);
    expect(receivedResource[0].type).toEqual('RECEIVE_RESOURCE');
    expect(receivedResource[0].resources).toBeA(Array);
    expect(receivedResource[0].resources[0].length).toBeGreaterThan(1);
    expect(receivedResource[0].resources[0][0][4]).toEqual('DEMOClose');
    expect(receivedResource[0].resources[0][1][1]).toEqual(14.32);
  });

});
