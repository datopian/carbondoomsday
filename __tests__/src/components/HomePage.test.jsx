import React from 'react'
import renderer from 'react-test-renderer'
import HomePage from '../../../src/components/HomePage'

test('Rendered output matches previously created snapshot', () => {
  const component = renderer.create(<HomePage />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
