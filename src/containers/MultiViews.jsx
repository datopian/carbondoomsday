import React, { PropTypes } from 'react'

import * as viewutils from '../utils/view'
import PlotlyChart from '../components/dataPackageView/PlotlyChart'
import VegaChart from '../components/dataPackageView/VegaChart'

export class MultiViews extends React.Component {
  constructor(props) {
    super(props)
    // TODO: what is the point of state? Why not just use props?
    this.state = {
      // we stub some basic fields to ensure render works ...
      dataPackage: this.props.dataPackage
    }
  }


  render() {
    let dp = this.state.dataPackage
    let viewComponents
    if(dp.views) {
      viewComponents = dp.views.map((view, idx) => {
        // first let's fix up recline views ...
        if (view.type == 'Graph') { // it's a recline view
          view = viewutils.convertReclineToSimple(view)
        }
        let compiledView = viewutils.compileView(view, dp)
        switch (view.specType) {
          case 'simple': // convert to plotly then render
            let spec = {}
            if(compiledView.resources[0]._values) {
              spec = viewutils.simpleToPlotly(compiledView)
            }
            return <PlotlyChart data={spec.data} layout={spec.layout} idx={idx} key={idx} />
          case 'vega': // do not convert spec as it is already Vega so we render VegaChart
            let data
            if(compiledView.resources[0]._values) {
              let rowsAsObjects = true // vega requires data rows to be as objects
              data = viewutils.getResourceCachedValues(compiledView.resources[0], rowsAsObjects)
            }
            view.spec.data = [{
              name: compiledView.resources[0].name,
              values: data
            }]
            return <VegaChart spec={view.spec} idx={idx} key={idx} />
        }
      })
    }
    return <div>{viewComponents}</div>
  }
}

export default MultiViews
