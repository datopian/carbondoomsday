import 'babel-polyfill'
import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import { DataPackageView } from '../../../src/containers/DataPackageView'

describe('Datapackage View Container', () => {
  const wrapper = shallow(<DataPackageView publisherName="publisher" packageName="pack" readme="readme" />)

  it('should render data package panel component', () => {
    expect(wrapper.text()).toContain('<DataPackagePanel />')
  })
})
