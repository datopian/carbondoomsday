import React from 'react'
import renderer from 'react-test-renderer'
import NavBar from '../../../../src/components/navbar/NavBar'

test('Rendered output matches previously created snapshot', () => {
  const component = renderer.create(<NavBar />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
