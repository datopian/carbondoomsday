import React from "react"
import { mount } from 'enzyme'
import PlotlyChart from "../../../src/components/plotly.js"

const mockData = [{
  x: [
    '2014-01-01T18:00:00.000Z',
    '2014-01-02T18:00:00.000Z',
    '2014-01-05T18:00:00.000Z'
  ],
  y: [ 14.23, 13.76, 13.55 ],
  mode: 'lines',
  name: 'DEMOClose'
}]

const mockLayout = { layout: { xaxis: { title: 'Date' } } }

describe("plotly chart module", () => {

  it("should receive correct props and render div with specific id", () => {
    let idx = 0
    const wrapper = mount(<PlotlyChart data={mockData} layout={mockLayout} idx={idx} />)
    expect(wrapper.html()).toEqual('<div id="plotly'+idx+'"></div>')
    expect(wrapper.prop('idx')).toEqual(0)
    expect(wrapper.prop('data')).toEqual(mockData)
    expect(wrapper.prop('layout')).toEqual(mockLayout)
  })

})
