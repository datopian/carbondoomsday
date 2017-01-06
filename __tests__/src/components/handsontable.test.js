import React from "react"
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import HandsOnTable from "../../../src/components/handsontable.js"

describe("handsontable component", () => {

  it("should have returned a handsontable", () => {
    sinon.spy(HandsOnTable.prototype, 'componentDidMount')
    const wrapper = mount(<HandsOnTable data={[[1,2],[3,4],[5,6]]} colHeaders={["f","s"]} />)

    expect(wrapper.contains(<table className="htCore" />)).to.equal(true)
  })

})
