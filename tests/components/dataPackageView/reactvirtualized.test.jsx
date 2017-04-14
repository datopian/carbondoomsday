import 'babel-polyfill'
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import ReactVirtualized from '../../../src/components/dataPackageView/ReactVirtualized'

const mockSpec = {
  data: [
    {
      "Date": "2014-01-01",
      "High": 14.59,
      "Open": 14.32
    },
    {
      "Date": "2014-01-02",
      "High": 14.22,
      "Open": 14.06
    },
    {
      "Date": "2014-01-05",
      "High": 14,
      "Open": 13.41
    }
  ]
  , headers: [
    'Date'
    , 'Open'
    , 'High'
  ]
  , width: 1136
  , height: 30 * 3 + 20
  , headerHeight: 20
  , rowHeight: 30
  , rowCount: 3
  , "columnWidth": 378.6666666666667
}

const mockSpecNoData = {
  data: undefined
  , headers: [
    'Date'
    , 'Open'
    , 'High'
  ]
  , width: 1136
  , height: 20
  , headerHeight: 20
  , rowHeight: 30
  , rowCount: 0
  , "columnWidth": 378.6666666666667
}

describe('ReactVirtualized component', () => {
  it('should match the snapshot - with data', () => {
    const wrapper = shallow(<ReactVirtualized spec={mockSpec} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should match the snapshot - without data', () => {
    const wrapper = shallow(<ReactVirtualized spec={mockSpecNoData} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
