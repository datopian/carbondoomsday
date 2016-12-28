jest.dontMock("../../../src/components/table.js")
import TestUtils from "react-addons-test-utils"
import React from "react"
import ReactDOM from "react-dom"
import Table from "../../../src/components/table.js"

describe("handsontable module", () => {
  it("should render table", () => {
    let handsontable = TestUtils.renderIntoDocument(
      <Table />
    )

    let table = TestUtils.findRenderedDOMComponentWithTag(handsontable, "table")

    expect(table.attr("class")).toBe("htCore")
  })
})
