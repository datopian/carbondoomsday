import "babel-polyfill"
import React from "react"
import { shallow, mount } from 'enzyme' //for testing with shallow/mount wrapper
import sinon from 'sinon' //for spy
import { DataPackageViewContainer } from "../../../src/containers/DataPackageViewContainer"
import ContainerWithRedux from "../../../src/containers/DataPackageViewContainer"
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../src/actions/datapackageActions'

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

  const wrapper = shallow(<DataPackageViewContainer idx={0} />)

  it("should render PlotlyChart component and pass index", () => {
    expect(wrapper.props().idx).toEqual(0)
    expect(wrapper.text()).toEqual('<PlotlyChart />')
  })

  it("should generate spec for Plotly", () => {
    let spec = wrapper.instance().generatePlotlySpec(mockDescriptor.views[0])
    expect(spec.layout.xaxis.title).toEqual('Date')
  })

  it("should convert data for Plotly", () => {
    let data = wrapper.instance().convertData(mockData, mockDescriptor)
    expect(data[0].x[0]).toEqual('2014-01-01T18:00:00.000Z')
    expect(data[0].mode).toEqual('lines')
  })

  it("should generate vega-lite spec", () => {
    let vlSpec = wrapper.instance().generateVegaLiteSpec(mockData, mockDescriptor.views[0])
    expect(vlSpec.layers[0].mark).toEqual("line")
    expect(vlSpec.data.values[0].DEMOClose).toEqual(14.23)
    expect(vlSpec.layers[0].encoding.x.field).toEqual("Date")
    expect(vlSpec.layers[0].encoding.y.field).toEqual("DEMOClose")
  })

})

describe("Datapackage View Container with Redux", () => {
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)
  let store = mockStore({
    datapackage: mockDescriptor,
    resources: [mockData]
  })

  it("should call componentWillReceiveProps after props change", async () => {
    sinon.spy(ContainerWithRedux.prototype, 'componentWillReceiveProps')
    const wrapper = mount(
      <Provider store={store}>
        <ContainerWithRedux idx={0} />
      </Provider>
    )
    expect(ContainerWithRedux.prototype.componentWillReceiveProps.calledOnce).toEqual(false)
    wrapper.setProps({test: 'test'}) //changing props
    expect(ContainerWithRedux.prototype.componentWillReceiveProps.calledOnce).toEqual(true)
  })

})
