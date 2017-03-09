import React, { PropTypes } from 'react'

import * as viewutils from '../utils/view'
import PlotlyChart from '../components/dataPackageView/PlotlyChart'
import VegaLiteChart from '../components/dataPackageView/VegaLiteChart'

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
    return <div>{viewComponents}</div>
  }
}

export default MultiViews
