import React from 'react'
import ReactDOM from 'react-dom'
import lodash from 'lodash'
import {Package, Resource} from 'datapackage'
import '../node_modules/handsontable/dist/handsontable.full.min.css'
import HandsOnTable from './components/dataPackageView/HandsOnTable'
import MultiViews from "./containers/MultiViews"; // eslint-disable-line
import LeafletMap from './components/dataPackageView/LeafletMap'
import * as dputils from './utils/datapackage'
import * as dprender from 'datapackage-render'


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

let dpObj

let divElements = document.querySelectorAll('.react-me')

fetchDpAndResourcesAndRenderViews(DP_ID, divElements)

async function fetchDpAndResourcesAndRenderViews(dataPackageIdentifier, divElements) {
  let basePath
  if (lodash.isString(dataPackageIdentifier)) {
    basePath = dataPackageIdentifier.replace('datapackage.json', '')
  } else if (lodash.isPlainObject(dataPackageIdentifier)) {
    basePath = dataPackageIdentifier.path
  }
  dpObj = await Package.load(dataPackageIdentifier, {basePath, strict: false})

  dpObj.descriptor.resources = dpObj.resources.map(resource => resource.descriptor)
  // Split out normal and preview views
  const normalViews = []
  const previewViews = []
  dpObj.descriptor.views.forEach(view => {
    if (!view.datahub) {
      normalViews.push(view)
    } else if (view.datahub.type === 'preview') {
      previewViews.push(view)
    }
  })
  // Identify which resources are needed for normal views
  const resourcesForNormalViews = []
  const resourcesForPreviewViews = []
  normalViews.forEach(view => {
    if (view.resources) {
      view.resources.forEach(res => {
        let resourceForView, idx
        if (lodash.isString(res)) {
          resourceForView = dprender.findResourceByNameOrIndex(dpObj.descriptor, res)
          idx = dpObj.descriptor.resources.indexOf(resourceForView)
        } else if (lodash.isPlainObject(res)) {
          resourceForView = dprender.findResourceByNameOrIndex(dpObj.descriptor, res.name)
          idx = dpObj.descriptor.resources.indexOf(resourceForView)
        } else if (lodash.isNumber(res)) {
          idx = res
        }
        resourcesForNormalViews.push(idx)
      })
    } else {
      resourcesForNormalViews.push(0)
    }
  })
  // Render preview views for which derived/preview versions exist.
  // If not exist then identify corresponding normal resource.
  previewViews.forEach(view => {
    let previewResourceFound = false
    const resourceForPreview = dprender.findResourceByNameOrIndex(dpObj.descriptor, view.resources[0])
    const idx = dpObj.descriptor.resources.indexOf(resourceForPreview)
    if (resourceForPreview.alternates) {
      resourceForPreview.alternates.forEach(async res => {
        if (res.datahub.type === 'derived/preview') {
          previewResourceFound = true
          res = await Resource.load(res)
          res.descriptor._values = await dputils.fetchDataOnly(res)
          renderView(view, res.descriptor, idx+1, dpObj.descriptor)
        }
      })
    }
    if (!previewResourceFound) {
      resourcesForPreviewViews.push(idx)
    }
  })
  // Concatinate required resources for normal and preview views.
  // Get only unique values.
  let requiredResources = resourcesForNormalViews.concat(resourcesForPreviewViews)
  requiredResources = [...new Set(requiredResources)] // Unique values
  // Load required resources and render views
  await Promise.all(requiredResources.map(async idx => {
    dpObj.resources[idx].descriptor._values = await dputils.fetchDataOnly(dpObj.resources[idx])
    if (resourcesForNormalViews.includes(idx)) {
      renderView('view', dpObj.resources[idx].descriptor, null, dpObj.descriptor)
    }
    if (resourcesForPreviewViews.includes(idx)) {
      renderView('preview', dpObj.resources[idx].descriptor, idx+1, dpObj.descriptor)
    }
  }))
}

function renderView (view, resource, idx, dp) {
  if (view === 'preview' || (view.datahub && view.datahub.type === 'preview')) {
    const el = divElements[idx]
    if (resource.format === 'geojson') {
      ReactDOM.render(<LeafletMap featureCollection={resource._values} idx={idx} />, el)
    } else if (resource.format !== 'topojson') {
      let compiledViewSpec = {
        resources: [resource],
        specType: 'handsontable'
      }
      let spec = dprender.handsOnTableToHandsOnTable(compiledViewSpec)
      ReactDOM.render(<HandsOnTable spec={spec} idx={idx} />, el);
    }
  } else {
    ReactDOM.render(<MultiViews dataPackage={dp} />, divElements[0])
  }
}

exports.renderView = renderView
exports.fetchDpAndResourcesAndRenderViews = fetchDpAndResourcesAndRenderViews
