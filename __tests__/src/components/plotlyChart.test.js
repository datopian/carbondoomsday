//jest.dontMock("../../../src/components/plotlyChart.js")
import React from "react"
import TestUtils from "react-addons-test-utils"
import renderer from "react-test-renderer"
import PlotlyChart from "../../../src/components/plotlyChart.js"

describe("plotly chart module", () => {

  it("should have generated plotly spec", () => {
    const renderer = TestUtils.createRenderer()
    renderer.render(<PlotlyChart />)
    const result = renderer.getRenderOutput()

    expect(result.type).toBe("div")
    expect(result.props.id).toBe("vis")
  })

})
