import React from "react"
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import PlotlyChart from "../../../src/components/plotly.js"

describe("plotly chart module", () => {

  it("should have generated plotly graph", () => {
    sinon.spy(PlotlyChart.prototype, 'componentDidMount')
    const wrapper = mount(<PlotlyChart data={[{x: ['2014-01-02', '2014-01-03'], y: [5, 8], mode: "lines"}]} />)

    expect(wrapper.contains(<svg className="main svg" />)).to.equal(true)
  })

})
