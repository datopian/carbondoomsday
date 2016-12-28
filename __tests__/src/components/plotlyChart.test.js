jest.dontMock("../../../src/components/plotlyChart.js")
import TestUtils from "react-addons-test-utils"
import React from "react"
import ReactDOM from "react-dom"
import PlotlyChart from "../../../src/components/plotlyChart.js"

describe("plotly chart module", () => {
  it("should render a graph", () => {
    let plotlyChart = TestUtils.renderIntoDocument(
      <PlotlyChart />
    )

    let graph = TestUtils.findRenderedDOMComponentWithTag(plotlyChart, "svg")

    expect(graph.attr("class")).toBe("main-svg")
    expect(graph.hasChildNodes()).toBeTruthy()
    expect(graph.childNodes.length).toEqual(10)
  })
})
