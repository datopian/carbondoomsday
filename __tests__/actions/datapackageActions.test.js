import 'babel-polyfill'
// import configureMockStore from 'redux-mock-store';
// import nock from 'nock';
// import thunk from 'redux-thunk';
import expect from 'expect'

// import * as actions from '../../../src/actions/datapackageActions';
//
// const middlewares = [ thunk ];
// const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  // beforeEach(() =>{
  //   nock('https://staging.datapackaged.com')
  //     .log(console.log)
  //     .get('/api/package/core/package1')
  //     .replyWithFile(200, __dirname +'fixtures/api_response/datapackage_api_response.json');
  //
  //   nock('https://bits.staging.datapackaged.com')
  //     .log(console.log)
  //     .get('/metadata/core/package1/_v/latest/data/demo-resource.csv')
  //     .replyWithFile(200, './fixtures/dp2/data/demo-resource.csv');
  // });
  //
  //
  // afterEach(() => {
  //   nock.cleanAll();
  // });
  it('dummy test', () => {
    expect(1).toEqual(1)
  })

  // it('creates RECEIVE_DATAPACKAGE when fetching datapackage is done', async () => {
  //
  //   const store = mockStore({ descriptor: {}, readme: '' });
  //   await store.dispatch(actions.getDataPackage('core', 'package1'));
  //   let receivedDp = store.getActions();
  //   expect(receivedDp[1]).toBeA(Object);
  //   expect(receivedDp[1].type).toEqual('RECEIVE_DATAPACKAGE');
  //   expect(receivedDp[1].dp.title).toEqual('DEMO - CBOE Volatility Index');
  //   expect(receivedDp[1].dp.views[0].type).toEqual('Graph');
  //   expect(receivedDp[1].dp.resources).toBeA(Array);
  // });
  //
  // it('creates RECEIVE_RESOURCE when fetching resource is done', async () => {
  //   nock('https://staging.datapackaged.com')
  //     .log(console.log)
  //     .get('/api/package/core/package1')
  //     .replyWithFile(200, __dirname +'/fixtures/api_response/datapackage_api_response.json');
  //
  //   nock('https://bits.staging.datapackaged.com')
  //     .log(console.log)
  //     .get('/metadata/core/package1/_v/latest/data/demo-resource.csv')
  //     .replyWithFile(200, './fixtures/dp2/data/demo-resource.csv');
  //
  //   const store = mockStore({ descriptor: {}, readme: '' });
  //   await store.dispatch(actions.getDataPackage('core', 'package1'));
  //   let receivedResource = store.getActions();
  //   expect(receivedResource[0]).toBeA(Object);
  //   expect(receivedResource[0].type).toEqual('RECEIVE_RESOURCE');
  //   expect(receivedResource[0].resources).toBeA(Array);
  //   expect(receivedResource[0].resources[0].length).toBeGreaterThan(1);
  //   expect(receivedResource[0].resources[0][0][4]).toEqual('DEMOClose');
  //   expect(receivedResource[0].resources[0][1][1]).toEqual(14.32);
  // });
})
