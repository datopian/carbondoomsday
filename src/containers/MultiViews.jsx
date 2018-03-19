import urllib from 'url'

import React, { PropTypes } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ReactHover from 'react-hover'

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
      dataPackage: this.props.dataPackage,
      hoverText: 'Copy to clipboard'
    }
  }

  copied() {
    this.setState({
      hoverText: 'Copied!'
    })
    setTimeout(() => {
      this.setState({
        hoverText: 'Copy to clipboard'
      })
    }, 1500)
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
              return <HandsOnTable spec={htSpec} idx={idx + 'v'} key={idx} />
          }
          let baseUrl = window.location.href
          baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
          const viewPath = `view/${idx}`
          const sharedUrl = urllib.resolve(baseUrl, viewPath)
          const iframe = `<iframe src="${sharedUrl}" width="100%" height="475px" frameborder="0"></iframe>`
          const pathToDataset = dp.datahub ? `https://datahub.io/${dp.datahub.owner}/${dp.name}` : 'https://datahub.io'
          const tracker = `watermark-${baseUrl}`
          const optionsCursorTrueWithMargin = {
            followCursor: true,
            shiftX: -5,
            shiftY: 20
          }

          return (
            <div>
              {readyView}
              <div className="datahub-meta">
                <a className="dataset-name" href={pathToDataset} onClick={(e) => {
                    trackOutboundLink(tracker)
                  }}
                  target="_blank">{dp.name}
                </a>
                <span className="meta-text"> powered by ❒ </span>
                <a className="datahub-home" href="https://datahub.io" onClick={(e) => {
                    trackOutboundLink(tracker)}
                  }
                  target="_blank">DataHub
                </a>
              </div>
              <div className="share-and-embed">

                <span className="copy-text">Share:</span>
                <input value={sharedUrl} className="copy-input" />
                <ReactHover options={optionsCursorTrueWithMargin}>
                  <ReactHover.Trigger type='trigger'>
                    <CopyToClipboard text={sharedUrl}
                      onCopy={() => this.copied()}>
                        <button className="copy-button">
                          <i class="fa fa-clipboard" aria-hidden="true"></i>
                        </button>
                    </CopyToClipboard>
                  </ReactHover.Trigger>
                  <ReactHover.Hover type='hover'>
                    <span className="hover-text">{this.state.hoverText}</span>
                  </ReactHover.Hover>
                </ReactHover>

                <span className="copy-text">Embed:</span>
                <input value={iframe} className="copy-input" />
                <ReactHover options={optionsCursorTrueWithMargin}>
                  <ReactHover.Trigger type='trigger'>
                    <CopyToClipboard text={iframe}
                      onCopy={() => this.copied()}>
                        <button className="copy-button">
                          <i class="fa fa-clipboard" aria-hidden="true"></i>
                        </button>
                    </CopyToClipboard>
                  </ReactHover.Trigger>
                  <ReactHover.Hover type='hover'>
                    <span className="hover-text">{this.state.hoverText}</span>
                  </ReactHover.Hover>
                </ReactHover>

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
