import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import PlotlyChart from '../../../../src/components/dataPackageView/PlotlyChart'

const mockData = [{
  x: [
    '2014-01-01T18:00:00.000Z'
    , '2014-01-02T18:00:00.000Z'
    , '2014-01-05T18:00:00.000Z'
  ]
  , y: [14.23, 13.76, 13.55]
  , mode: 'lines'
  , name: 'DEMOClose'
}]

const mockLayout = { layout: { xaxis: { title: 'Date' } } }

describe('plotly chart module', () => {
  it('should receive correct props and render div with specific id', () => {
    const idx = 0
    const wrapper = shallow(<PlotlyChart data={mockData} layout={mockLayout} idx={idx} />)
    expect(wrapper.instance().props.idx).toEqual(0)
    expect(wrapper.instance().props.data).toEqual(mockData)
    expect(wrapper.instance().props.layout).toEqual(mockLayout)

    expect(wrapper.html()).toEqual(`<div id="plotly${idx}"></div>`)
  })
})
