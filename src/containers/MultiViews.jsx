import urllib from 'url'

import React, { PropTypes } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import * as dprender from 'datapackage-render'
import PlotlyChart from '../components/dataPackageView/PlotlyChart'
import VegaChart from '../components/dataPackageView/VegaChart'
import HandsOnTable from '../components/dataPackageView/HandsOnTable'

export class MultiViews extends React.Component {
  constructor(props) {
    super(props)
    // TODO: what is the point of state? Why not just use props?
    this.state = {
      // we stub some basic fields to ensure render works ...
      dataPackage: this.props.dataPackage
    }
  }


  render() {
    let dp = this.state.dataPackage
    let viewComponents
    if(dp.views) {
      viewComponents = dp.views.map((view, idx) => {
        // check if the view is not a preview
        if (!view.datahub || !(view.datahub.type === 'preview')) {
          // first let's fix up recline views ...
          if (view.type == 'Graph') { // it's a recline view
            view = dprender.convertReclineToSimple(view)
          }
          let compiledView = dprender.compileView(view, dp)
          let readyView
          switch (view.specType) {
            case 'simple': // convert to plotly then render
              let spec = {}
              if(compiledView.resources[0]._values) {
                spec = dprender.simpleToPlotly(compiledView)
              }
              readyView = <PlotlyChart data={spec.data} layout={spec.layout} idx={idx} key={idx} />
              break
            case 'vega': // render VegaChart
              let vegaSpec = dprender.vegaToVega(compiledView)
              readyView = <VegaChart spec={vegaSpec} idx={idx} key={idx} />
              break
            case 'table': // render handsontable
              let htSpec = dprender.handsOnTableToHandsOnTable(compiledView)
              readyView = <HandsOnTable spec={htSpec} idx={idx + 'v'} key={idx} />
              break
          }
          let baseUrl = window.location.href
          baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
          const viewPath = `view/${idx}`
          const sharedUrl = urllib.resolve(baseUrl, viewPath)
          const iframe = `<iframe src="${sharedUrl}" width="100%" height="100%" frameborder="0"></iframe>`
          const embedableId = `embed${idx}`
          return (
            <div>
              {readyView}
              <div className="share-and-embed">
                <span className="copy-text">Share:</span>
                <input value={sharedUrl} className="copy-input" />
                  <CopyToClipboard text={sharedUrl}
                    onCopy={() => console.log('Copied to clipboard')}>
                    <button className="copy-button">Copy</button>
                  </CopyToClipboard>

                <span className="copy-text">Embed:</span>
                <input value={iframe} className="copy-input" />
                <CopyToClipboard text={iframe}
                  onCopy={() => console.log('Copied to clipboard')}>
                  <button className="copy-button">Copy</button>
                </CopyToClipboard>
              </div>
            </div>
          )
        }
      })
    }
    return <div>{viewComponents}</div>
  }
}

export default MultiViews
