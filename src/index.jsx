import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/handsontable/dist/handsontable.full.min.css'
import MultiViews from "./containers/MultiViews"; // eslint-disable-line
import HandsOnTable from './components/dataPackageView/HandsOnTable'
import * as dputils from './utils/datapackage'


let DATA_PACKAGE = DATA_PACKAGE || {}
let idx = 0

// From the back-end we expect a template to have div elements with specific
// class and data-type attributes:
//
// - To tell a front-end that a given div element is for React component, it
// should have class=react-me.
// - To tell a front-end which component to render in that div element, it
// should provide data-type attribute - resource-preview for HandsOnTable and
// data-views for the graphs.
// - Also any properties can be passed from the back-end using data-* prefix.

dputils.fetchDataPackageAndData(DATA_PACKAGE_URL).then(dpObj => {
  DATA_PACKAGE = dpObj.descriptor

  document
    .querySelectorAll('.react-me')
    .forEach(renderComponentInElement)
});


function renderComponentInElement(el) {
  if (el.dataset.type === 'resource-preview') {
    ReactDOM.render(<HandsOnTable resource={DATA_PACKAGE.resources[idx]} idx={idx} />, el);
    idx += 1
  } else if (el.dataset.type === 'data-views') {
    ReactDOM.render(<MultiViews dataPackage={DATA_PACKAGE} />, el);
  }
}
