import "babel-polyfill"
import React from "react"
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { DataPackageViewContainer } from "../../../src/containers/DataPackageViewContainer"
import ContainerWithRedux from "../../../src/containers/DataPackageViewContainer"
import { Provider } from 'react-redux'
import configureStore from '../../../src/store/configureStore'

const mockDescriptor = {
  "resources": [
    {
      "name": "demo-resource",
      "path": "data/demo-resource.csv",
      "format": "csv",
      "mediatype": "text/csv",
      "schema": {
        "fields": [
          {
            "name": "Date",
            "type": "date",
            "description": ""
          },
          {
            "name": "DEMOOpen",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOHigh",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOLow",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOClose",
            "type": "number",
            "description": ""
          }
        ],
        "primaryKey": "Date"
      }
    }
  ],
  "views": [
    {
      "id": "Graph",
      "type": "Graph",
      "state": {
        "graphType": "lines",
        "group": "Date",
        "series": [ "DEMOClose" ]
      }
    }
  ]
}

const mockData = [
  [ 'Date', 'DEMOOpen', 'DEMOHigh', 'DEMOLow', 'DEMOClose' ],
  [ '2014-01-01T18:00:00.000Z', 14.32, 14.59, 14.00, 14.23 ],
  [ '2014-01-02T18:00:00.000Z', 14.06, 14.22, 13.57, 13.76 ],
  [ '2014-01-05T18:00:00.000Z', 13.41, 14.00, 13.22, 13.55 ]
]

describe("Datapackage View Container", () => {

  const wrapper = shallow(<DataPackageViewContainer />)

  it("should render PlotlyChart component", () => {
    expect(wrapper.text()).toEqual('<PlotlyChart />')
  })

  it("should generate spec for Plotly", () => {
    let spec = wrapper.instance().generateSpec(mockDescriptor.views)
    expect(spec[0].layout.xaxis.title).toEqual('Date')
  })

  it("should convert data for Plotly", () => {
    let data = wrapper.instance().convertData(mockData, mockDescriptor)
    expect(data[0].x[0]).toEqual('2014-01-01T18:00:00.000Z')
    expect(data[0].mode).toEqual('lines')
  })

})

describe("Datapackage View Container with Redux", () => {
  const store = configureStore()

  it("componentDidMount should be called once", () => {
    sinon.spy(ContainerWithRedux.prototype, 'componentDidMount')
    //sinon.spy(ContainerWithRedux.prototype, 'componentWillReceiveProps')
    const wrapper = mount(
      <Provider store={store}>
        <ContainerWithRedux />
      </Provider>
    )
    expect(ContainerWithRedux.prototype.componentDidMount.calledOnce).toEqual(true)
  })
})
