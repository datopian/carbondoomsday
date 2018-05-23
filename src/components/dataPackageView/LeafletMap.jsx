import urllib from 'url'

import React from 'react'
import Leaf, { geoJSON } from 'leaflet'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ReactHover from 'react-hover'

class LeafletMap extends React.Component {

  componentWillUpdate(nextProps) {
    // update the plot with new props
    this.render_map(nextProps.featureCollection)
  }

  componentDidMount() {
    this.render_map(this.props.featureCollection)
  }

  render_map(collection){
    if ( collection !== undefined) {
      const map = Leaf.map(document.getElementById(`leaflet${this.props.idx}`)
        , { layers: new Leaf.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        }
      )
      const geojson = Leaf.geoJSON(collection)
      // Find the bound of the geojson return LatLngBounds
      const bounds = geojson.getBounds()
      // Find the center of the LatLngBounds returns LatLng
      const center = bounds.getCenter()
      // Change the map's view
      map.setView(center, 4)
      geojson.addTo(map)
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
    const divId = `leaflet${this.props.idx}`
    const windowHref = window.location.href
    const windowHrefParts = urllib.parse(windowHref)
    const baseUrl = windowHrefParts.protocol + '//' + windowHrefParts.host
      + windowHrefParts.path.split('/').slice(0,3).join('/') + '/'
    const viewPath = `r/${this.props.idx - 1}.html`
    let sharedUrl = urllib.resolve(baseUrl, viewPath)
    // If base url is a full URL (with /v/ revision number) then convert it to params:
    if (windowHref.match(/\/[^/]+\/[^/]+\/v\/[0-9]+/)) {
      const revision = parseInt(windowHrefParts.path.split('/')[4])
      sharedUrl += `?v=${revision}`
    }
    const iframe = `<iframe src="${sharedUrl}" width="100%" height="100%" frameborder="0"></iframe>`
    const tracker = `watermark-${baseUrl}`
    const optionsCursorTrueWithMargin = {
      followCursor: true,
      shiftX: -5,
      shiftY: 20
    }

    return (
      <div>
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
        <div id={divId} style={{ width: '100%', height: '300px' }} />
        <div className="datahub-meta">
          <span className="meta-text">Powered by ❒ </span>
          <a className="datahub-home" href="https://datahub.io" onClick={() => {
              trackOutboundLink(tracker)
            }}
            target="_blank">DataHub
          </a>
        </div>
      </div>
    )
  }
}


export default LeafletMap
