//jest.dontMock("../../../src/components/plotlyChart.js")
import React from "react"
import TestUtils from "react-addons-test-utils"
import renderer from "react-test-renderer"
import PlotlyChart from "../../../src/components/plotlyChart.js"

describe("plotly chart module", () => {

  it("should have generated plotly spec", () => {
    let plotlyChart = TestUtils.renderIntoDocument(
      <PlotlyChart />
    )
    expect(plotlyChart.state.myPlotlySpec).toBeDefined()
  })

})
