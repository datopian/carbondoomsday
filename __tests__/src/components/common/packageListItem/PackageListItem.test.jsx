import React from 'react'
import renderer from 'react-test-renderer'
import PackageListItem from '../../../../../src/components/common/PackageListItem'

test('Rendered output matches previously created snapshot', () => {
  const component = renderer.create(<PackageListItem
    name="finance-vix"
    description="Awesome package"
    title="Finance Vix Package"
    publisherName="publisher"
  />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
