import React, { PropTypes } from 'react'

import * as dprender from 'datapackage-render'
import PlotlyChart from '../components/dataPackageView/PlotlyChart'
import VegaChart from '../components/dataPackageView/VegaChart'
import HandsOnTable from '../components/dataPackageView/HandsOnTable'

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
          view = dprender.convertReclineToSimple(view)
        }
        let compiledView = dprender.compileView(view, dp)
        switch (view.specType) {
          case 'simple': // convert to plotly then render
            let spec = {}
            if(compiledView.resources[0]._values) {
              spec = dprender.simpleToPlotly(compiledView)
            }
            return <PlotlyChart data={spec.data} layout={spec.layout} idx={idx} key={idx} />
          case 'vega': // render VegaChart
            let vegaSpec = dprender.vegaToVega(compiledView)
            return <VegaChart spec={vegaSpec} idx={idx} key={idx} />
          case 'table': // render handsontable
            let htSpec = dprender.handsOnTableToHandsOnTable(compiledView)
            return <HandsOnTable spec={htSpec} idx={idx} key={idx} />
        }
      })
    }
    return <div>{viewComponents}</div>
  }
}

export default MultiViews
