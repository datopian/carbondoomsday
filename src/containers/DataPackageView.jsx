import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
const Datapackage = require('datapackage').Datapackage


import * as actions from '../actions/datapackageActions'
import * as dputils from '../../src/utils/datapackage'
import * as viewutils from '../utils/view'
import HandsOnTable from '../components/dataPackageView/HandsOnTable'
import PlotlyChart from '../components/dataPackageView/PlotlyChart'
import VegaLiteChart from '../components/dataPackageView/VegaLiteChart'

export class DataPackageView extends React.Component {
  constructor(props) {
    super(props)
    // TODO: what is the point of state? Why not just use props?
    this.state = {
      // we stub some basic fields to ensure render works ...
      dataPackage: Object.assign({resources: [], views: []}, this.props.dataPackage),
      dataPackageUrl: this.props.dataPackageUrl
    }
  }

  componentDidMount() {
    // if current dataPackage is empty let's load it ...
    // TODO: testing existence of name property is hacky way to check data
    // package exists
    if (!this.state.dataPackage.name) {
      dputils.fetchDataPackageAndData(this.state.dataPackageUrl).then(dpObj => {
        this.setState({
          dataPackage: dpObj.descriptor,
        })
      });
    }
  }

  render() {
    let dp = this.state.dataPackage
    let viewComponents = dp.views.map((view, idx) => {
      // first let's fix up recline views ...
      if (view.type == 'Graph') { // it's a recline view
        view = viewutils.convertReclineToSimple(view)
      }
      let compiledView = viewutils.compileView(view, dp)
      switch (view.specType) {
        case 'simple': // convert to plotly then render
          let spec = viewutils.simpleToPlotly(compiledView)
          return <PlotlyChart data={spec.data} layout={spec.layout} idx={idx} />
      }
    })
    let resourceDisplayComponents = dp.resources.map((resource, idx) => {
      let compiledViewSpec = {
        resources: [resource],
        specType: 'handsontable'
      }
      let spec = viewutils.handsOnTableToHandsOnTable(compiledViewSpec)
      return <HandsOnTable spec={spec} idx={idx} key={idx} />
    });
    return <div>{viewComponents.concat(resourceDisplayComponents)}</div>
  }
}

function mapStateToProps(state, ownProps) {
  const { descriptor, resources, readme } = state.dpr

  return {
    descriptor
    , resources
    , readme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dataPackageActions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPackageView)
