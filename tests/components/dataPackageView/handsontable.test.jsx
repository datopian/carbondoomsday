import React from 'react'
import { shallow } from 'enzyme'
import HandsOnTable from '../../../src/components/dataPackageView/HandsOnTable'


const mockResource = {
  _values: [
    [180, 18, "Tony"],
    [192, 15, "Pavle"],
    [160, 32, "Pero"],
    [202, 23, "David"]
  ],
  name: "random",
  schema: {
    fields: [
      {
        name: "height",
        type: "integer"
      },
      {
        name: "age",
        type: "integer"
      },
      {
        name: "name",
        type: "string"
      }
    ]
  }
}

describe('handsontable component', () => {
  it('should receive a resource and convert into spec then store in local state', () => {
    const idx = 0
    const wrapper = shallow(<HandsOnTable resource={mockResource} idx={idx} />)
    expect(wrapper.state().idx).toEqual(0)
    expect(wrapper.state().spec.data[0][2]).toEqual('Tony')
    expect(wrapper.html()).toEqual(`<div id="hTable${idx}"></div>`)
  })
})
