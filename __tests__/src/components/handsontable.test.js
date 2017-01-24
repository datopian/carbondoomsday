import React from "react"
import { mount } from 'enzyme'
import HandsOnTable from "../../../src/components/handsontable.js"

const mockSpec = {
  data: [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2016", 10, 11, 12, 13],
    ["2017", 20, 11, 14, 13],
    ["2018", 30, 15, 12, 13]
  ],
  colHeaders: true
}

describe("handsontable component", () => {

  it("should receive correct props and render div with specific id", () => {
    let idx = 0
    const wrapper = mount(<HandsOnTable spec={mockSpec} idx={idx} />)
    expect(wrapper.html()).toEqual('<div id="hTable'+idx+'"></div>')
    expect(wrapper.prop('idx')).toEqual(0)
    expect(wrapper.prop('spec').data[0][1]).toEqual("Ford")
  })

})
