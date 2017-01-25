import React from "react"
import { shallow } from 'enzyme'
import PublisherDetails from "../../../src/components/PublisherDetails"

const data1 = {
  "name": "Test",
  "description": "This is description"
}
const data2 = {
  "name": "Test"
}

describe("PublisherDetails component", () => {

  it("should render div element with publisher name and description", () => {
    const wrapper = shallow(
      <PublisherDetails data={data1} />
    )
    expect(wrapper.find(".container")).toHaveLength(1)
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Test")
    expect(wrapper.find("p")).toHaveLength(1)
    expect(wrapper.find("p").text()).toEqual("This is description")
  })

  it("should render div element with publisher name and description", () => {
    const wrapper = shallow(
      <PublisherDetails data={data2} />
    )
    expect(wrapper.find(".container")).toHaveLength(1)
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Test")
    expect(wrapper.find("p")).toHaveLength(0)
  })

})
