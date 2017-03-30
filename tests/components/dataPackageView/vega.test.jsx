import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import VegaChart from '../../../src/components/dataPackageView/VegaChart'
import sinon from 'sinon'
import vg from 'vega'

vg.parse.spec = jest.fn()

const mockSpec = {
  "width": 400,
  "height": 200,
  "axes": [],
  "marks": [],
  "scales": [],
  "data": [
    {
      "name": "demo-resource",
      "values": [
        {
          "Date": "2014-01-01",
          "High": 14.59,
          "Open": 14.32,
        },
        {
          "Date": "2014-01-02",
          "High": 14.22,
          "Open": 14.06,
        },
        {
          "Date": "2014-01-05",
          "High": 14,
          "Open": 13.41,
        },
      ],
    },
  ]
}

describe('vega chart component', () => {
  it('should receive correct props and render div with specific id', () => {
    const idx = 0
    const wrapper = shallow(<VegaChart spec={mockSpec} idx={idx} />)
    expect(wrapper.instance().props.idx).toEqual(0)
    expect(wrapper.instance().props.spec).toEqual(mockSpec)

    expect(wrapper.html()).toEqual(`<div id="vega${idx}" class="PlotlyGraph"></div>`)
  })
})

describe('how vega mounts and updates', () => {
  
  it('should call didMount and didUpdate methods after the component renders and re-renders', () => {
    const didMount = sinon.spy(VegaChart.prototype, 'componentDidMount')
    const didUpdate = sinon.spy(VegaChart.prototype, 'componentDidUpdate')
    const render = sinon.spy(VegaChart.prototype, 'render')
    delete mockSpec.data[0].values
    const idx = 0
    const wrapper = mount(<VegaChart spec={mockSpec} idx={idx} />)
    expect(didMount.calledAfter(render)).toBeTruthy()
    expect(didMount.calledOnce).toBeTruthy()
    expect(didUpdate.calledOnce).toBeFalsy()
    mockSpec.data[0].values = [
      {
        "Date": "2014-01-01",
        "High": 14.59,
        "Open": 14.32,
      },
      {
        "Date": "2014-01-02",
        "High": 14.22,
        "Open": 14.06,
      },
      {
        "Date": "2014-01-05",
        "High": 14,
        "Open": 13.41,
      },
    ]
    wrapper.setProps({ spec: mockSpec })
    expect(didUpdate.calledAfter(render)).toBeTruthy()
    expect(didUpdate.calledOnce).toBeTruthy()
    expect(wrapper.props().spec.data[0].values[0]["High"]).toEqual(14.59)
  })

})
