import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/handsontable/dist/handsontable.full.min.css'
import DataPackageView from "./containers/DataPackageView"; // eslint-disable-line


let DATA_PACKAGE = DATA_PACKAGE || {}

ReactDOM.render(
  <DataPackageView dataPackage={DATA_PACKAGE} dataPackageUrl={DATA_PACKAGE_URL} />
  , document.getElementById('vis')
)

