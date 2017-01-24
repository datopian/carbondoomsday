import React from "react"
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import VegaLiteChart from "../../../src/components/vegaLite.js"

const mockSpec = {
  data: {
    values: [
      {
        "Date": '2014-01-01T18:00:00.000Z',
        "DEMOOpen": 14.32,
        "DEMOHigh": 14.59,
        "DEMOLow": 14,
        "DEMOClose": 14.23
      },
      {
        "Date": '2014-01-02T18:00:00.000Z',
        "DEMOOpen": 14.06,
        "DEMOHigh": 14.22,
        "DEMOLow": 13.57,
        "DEMOClose": 13.76
      }
    ]
  },
  layers: [
    {
      mark: 'line',
      encoding: {
        x: { field: 'Date', type: 'temporal' },
        y: { field: 'DEMOClose', type: 'quantitative' }
      }  
    }
  ]
}

describe("vegaLite chart module", () => {

  it("should receive correct props and render div with specific id", () => {
    let idx = 0
    const spy = sinon.spy(VegaLiteChart.prototype, 'componentDidMount')
    const wrapper = mount(<VegaLiteChart vlSpec={mockSpec} idx={idx} />)
    expect(spy.calledOnce).toEqual(true)
    expect(wrapper.html()).toEqual('<div id="vega'+idx+'"></div>')
    expect(wrapper.prop('idx')).toEqual(0)
    expect(wrapper.prop('vlSpec')).toEqual(mockSpec)
  })

})
