import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/handsontable/dist/handsontable.full.min.css'
import configureStore from './store/configureStore'
import DataPackageView from "./containers/DataPackageView"; // eslint-disable-line


const store = configureStore()
let DATA_PACKAGE = DATA_PACKAGE || {}

ReactDOM.render(
  <Provider store={store}>
    <DataPackageView dataPackage={DATA_PACKAGE} dataPackageUrl={DATA_PACKAGE_URL} />
  </Provider>, document.getElementById('vis')
)

