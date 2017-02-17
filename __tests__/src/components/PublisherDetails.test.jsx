import React from 'react'
import { shallow } from 'enzyme'
import PublisherDetails from '../../../src/components/publisherPage/PublisherDetails'

const data = {
  name: 'Publisher'
  , title: 'Title'
  , joined: '2017-01-25'
}

describe('PublisherDetails component', () => {
  it('should render publisher name, title and joined date', () => {
    const wrapper = shallow(
      <PublisherDetails data={data} />
    )
    expect(wrapper.find('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toEqual('Publisher')
    expect(wrapper.find('h4')).toHaveLength(1)
    expect(wrapper.find('h4').text()).toEqual('Title')
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('p').text()).toEqual(' 2017-01-25')
  })
})
