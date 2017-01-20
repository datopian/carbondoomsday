import "babel-polyfill"
import React from "react"
import { shallow } from 'enzyme' //for testing with shallow wrapper
import { TabularResourceViewContainer } from "../../../src/containers/TabularResourceViewContainer"

describe("Multiple Tabular Resource Container", () => {
  let wrapper = []
  for(let i=0; i<3; i++) {
    wrapper.push(shallow(
      <TabularResourceViewContainer idx={i} />
    ))

    it("should render 3 tables", () => {
      let idx = wrapper[i].props().idx
      expect(wrapper[i].html()).toEqual('<div id="hTable'+idx+'"></div>')
    })
  }

})
