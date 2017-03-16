import React from 'react'
import ReactDOM from 'react-dom'
const Datapackage = require('datapackage').Datapackage
import '../node_modules/handsontable/dist/handsontable.full.min.css'
import MultiViews from "./containers/MultiViews"; // eslint-disable-line
import HandsOnTable from './components/dataPackageView/HandsOnTable'
import LeafletMap from './components/dataPackageView/LeafletMap'
import * as dputils from './utils/datapackage'
import * as viewutils from './utils/view'


/**
 * From the back-end we expect a template to have div elements with specific
 * class, data-type and data-resource attributes:
 *
 * - To tell a front-end that a given div element is for React component, it
 * should have class=react-me.
 * - To tell a front-end which component to render in that div element, it
 * should provide data-type attribute - resource-preview for HandsOnTable and
 * data-views for the graphs.
 * - To tell a front-end which resource to render, it should provide
 * data-resource attirbute with index of resource or name.
 * - Also any properties can be passed from the back-end using data-* prefix.
 */

let dataPackage

let divElements = document.querySelectorAll('.react-me')

fetchDataPackageAndDataIncrementally(DATA_PACKAGE_URL, divElements)

async function fetchDataPackageAndDataIncrementally(dataPackageIdentifier, divElements) {
  const dpObj = await new Datapackage(dataPackageIdentifier)
  dataPackage = dpObj.descriptor

  divElements.forEach(exports.renderComponentInElement)

  await Promise.all(dpObj.resources.map(async (resource, idx) => {
    resource.descriptor._values = await dputils.fetchDataOnly(resource)

    // Only re-render MultiView if this resource is used in one of the views.
    // We expect view object to have 'resources' attribute that is an array of
    // indexes and each index refers to a resource. If not, this view refers to
    // the first resource.
    if (dataPackage.views !== undefined){
      dataPackage.views.forEach(view => {
        if(!view.resources && idx === 0) {
          exports.renderComponentInElement(divElements[0])
        } else if(view.resources) {
          view.resources.forEach(resourceIdx => {
            if(resourceIdx === idx) {
              exports.renderComponentInElement(divElements[0])
            }
          })
        }
      })
    }
    // here we re-render a table for which data is loaded in this iteration
    exports.renderComponentInElement(divElements[idx+1])
  }))
}


function renderComponentInElement(el) {
  const dp = Object.assign({}, dataPackage)
  if (el.dataset.type === 'resource-preview') {
    let idx = parseInt(el.dataset.resource)
    let resource = viewutils.findResourceByNameOrIndex(dp, idx)
    if (resource.format === 'geojson') {
      ReactDOM.render(<LeafletMap featureCollection={resource._values} idx={idx} />, el)
    } else {
      let compiledViewSpec = {
        resources: [resource],
        specType: 'handsontable'
      }
      let spec = viewutils.handsOnTableToHandsOnTable(compiledViewSpec)
      ReactDOM.render(<HandsOnTable spec={spec} idx={idx} />, el);
    }
  } else if (el.dataset.type === 'data-views') {
    ReactDOM.render(<MultiViews dataPackage={dp} />, el)
  }
}

exports.renderComponentInElement = renderComponentInElement
exports.fetchDataPackageAndDataIncrementally = fetchDataPackageAndDataIncrementally
