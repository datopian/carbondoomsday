import "babel-polyfill"
import React from "react"
import { shallow } from 'enzyme' //for testing with shallow wrapper
import { DataPackageViewContainer } from "../../../src/containers/DataPackageViewContainer"

describe("Multiple DataPackage View Container", () => {
  for(let i=0; i<3; i++) {
    let wrapper = shallow(
      <DataPackageViewContainer idx={i} />
    )

    it("should render 3 charts", () => {
      let idx = wrapper.props().idx
      expect(wrapper.html()).toEqual('<div id="plotly'+idx+'"></div>')
    })
  }

})
