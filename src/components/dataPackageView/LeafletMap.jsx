import urllib from 'url'

import React from 'react'
import Leaf, { geoJSON } from 'leaflet'
import {CopyToClipboard} from 'react-copy-to-clipboard'

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

  render() {
    const divId = `leaflet${this.props.idx}`
    let baseUrl = window.location.href
    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'
    const viewPath = `r/${this.props.idx - 1}.html`
    const sharedUrl = urllib.resolve(baseUrl, viewPath)
    const iframe = `<iframe src="${sharedUrl}" width="100%" height="100%" frameborder="0"></iframe>`
    const tracker = `watermark-${baseUrl}`
    return (
      <div>
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
