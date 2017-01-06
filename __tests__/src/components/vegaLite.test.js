import React from "react"
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import VegaLiteChart from "../../../src/components/vegaLite.js"

describe("vegaLite chart module", () => {

  it("should have generated vegaLite graph", () => {
    sinon.spy(VegaLiteChart.prototype, 'componentDidMount')
    const wrapper = mount(<VegaLiteChart data={[{x: '2014-01-02', y: 5}, {x: '2014-01-03', y: 8}]} />)

    expect(wrapper.contains(<div className="vega" />)).to.equal(true)
    expect(wrapper.contains(<canvas className="marks" />)).to.equal(true)
  })

})
