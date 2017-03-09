import React from 'react'
import { shallow } from 'enzyme'
import LeafletMap from '../../../src/components/dataPackageView/LeafletMap'

const mockSpec = {
  features: [
    {
      type: 'Feature'
      , geometry: {
        type: 'Point'
        , coordinates: [
          20.522875
          , 51.070292
        ]
      }
      , properties: {
        id: 1
        , 'marker-size': 'small'
        , 'marker-color': '#f5a91a'
        , 'marker-symbol': 'b'
      }
    }
  ]
  , type: 'FeatureCollection'
}

describe('leafletmap component', () => {
  it('should receive correct props and render div with specific id', () => {
    const idx = 0
    const wrapper = shallow(<LeafletMap featureCollection={mockSpec} idx={idx} />)
    expect(wrapper.instance().props.idx).toEqual(0)
    expect(wrapper.html()).toEqual(`<div id="leaflet${idx}" style="width:100%;height:300px;"></div>`)
  })
})
