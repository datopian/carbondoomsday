import React from 'react'
import Leaf, { geoJSON } from 'leaflet'

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
    return (
      <div id={divId} style={{ width: '100%', height: '300px' }} />
    )
  }
}


export default LeafletMap
