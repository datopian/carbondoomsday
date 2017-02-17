import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../../../../src/components/footer/Footer'

test('Rendered output matches previously created snapshot', () => {
  const component = renderer.create(<Footer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
