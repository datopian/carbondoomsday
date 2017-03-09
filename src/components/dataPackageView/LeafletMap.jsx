import React from 'react'
import Leaf, { geoJSON } from 'leaflet'
import { Map, GeoJSON, TileLayer } from 'react-leaflet'

class LeafletMap extends React.Component {

  componentDidMount() {
    const map = Leaf.map(document.getElementById(`leaflet${this.props.idx}`)
      , { layers: new Leaf.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      }
    )
    const geojson = Leaf.geoJSON(this.props.featureCollection)
    // Find the bound of the geojson return LatLngBounds
    const bounds = geojson.getBounds()
    // Find the center of the LatLngBounds returns LatLng
    const center = bounds.getCenter()
    // Change the map's view
    map.setView(center, 4)
    geojson.addTo(map)
  }

  render() {
    const divId = `leaflet${this.props.idx}`
    return (
      <div id={divId} style={{ width: '100%', height: '300px' }} />
    )
  }
}


export default LeafletMap
