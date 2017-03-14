import React from 'react'
import { shallow, mount } from 'enzyme'
import PlotlyChart from '../../../src/components/dataPackageView/PlotlyChart'
import sinon from 'sinon'
import Plotly from 'plotly.js/lib/core'

Plotly.newPlot = jest.fn()

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

    expect(wrapper.html()).toEqual(`<div id="plotly${idx}" class="PlotlyGraph"></div>`)
  })
})

describe('how plotly mounts and updates', () => {
  it('should call didMount and didUpdate methods after the component renders and re-renders', () => {
    const didMount = sinon.spy(PlotlyChart.prototype, 'componentDidMount')
    const didUpdate = sinon.spy(PlotlyChart.prototype, 'componentDidUpdate')
    const render = sinon.spy(PlotlyChart.prototype, 'render')
    let data, layout = undefined
    const idx = 0
    const wrapper = mount(<PlotlyChart data={data} layout={layout} idx={idx} />)
    expect(didMount.calledAfter(render)).toBeTruthy()
    expect(didMount.calledOnce).toBeTruthy()
    expect(didUpdate.calledOnce).toBeFalsy()
    
    wrapper.setProps({ data: mockData, layout: mockLayout })
    expect(didUpdate.calledAfter(render)).toBeTruthy()
    expect(didUpdate.calledOnce).toBeTruthy()
    expect(wrapper.props().data[0].y[0]).toEqual(14.23)
  })
})
