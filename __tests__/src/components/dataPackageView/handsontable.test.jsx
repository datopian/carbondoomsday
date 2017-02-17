import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import HandsOnTable from '../../../../src/components/dataPackageView/HandsOnTable'

const mockSpec = {
  data: [
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda']
    , ['2016', 10, 11, 12, 13]
    , ['2017', 20, 11, 14, 13]
    , ['2018', 30, 15, 12, 13]
  ]
  , colHeaders: true
}

describe('handsontable component', () => {
  it('should receive correct props and render div with specific id', () => {
    const idx = 0
    const wrapper = shallow(<HandsOnTable spec={mockSpec} idx={idx} />)
    expect(wrapper.instance().props.idx).toEqual(0)
    expect(wrapper.instance().props.spec.data[0][1]).toEqual('Ford')
    expect(wrapper.html()).toEqual(`<div id="hTable${idx}"></div>`)
  })
})
