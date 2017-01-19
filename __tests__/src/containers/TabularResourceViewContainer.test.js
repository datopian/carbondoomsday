import "babel-polyfill"
import React from "react"
import { shallow } from 'enzyme' //for testing with shallow/mount wrapper
import { TabularResourceViewContainer } from "../../../src/containers/TabularResourceViewContainer"

const mockData = [
  [ 'Date', 'DEMOOpen', 'DEMOHigh', 'DEMOLow', 'DEMOClose' ],
  [ '2014-01-01T18:00:00.000Z', 14.32, 14.59, 14.00, 14.23 ],
  [ '2014-01-02T18:00:00.000Z', 14.06, 14.22, 13.57, 13.76 ],
  [ '2014-01-05T18:00:00.000Z', 13.41, 14.00, 13.22, 13.55 ]
]

describe("Tabular Resource Container", () => {

  const wrapper = shallow(<TabularResourceViewContainer idx={0} />)

  it("should render HandsOnTable component and pass index and spec", () => {
    expect(wrapper.props().idx).toEqual(0)
    expect(wrapper.props().spec).toBeDefined()
    expect(wrapper.text()).toEqual('<HandsOnTable />')
  })

  it("should generate spec with data for HandsOnTable", () => {
    let spec = wrapper.instance().buildHandsontableSpec(mockData)
    expect(spec.data.length).toEqual(mockData.length-1)
    expect(spec.colHeaders[4]).toEqual('DEMOClose')
  })

})
