import React from "react"
import Plotly from "plotly.js/lib/core"
//connect redux:
import { connect } from 'react-redux'
import * as actions from '../actions/datapackageActions'

class PlotlyChart extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(actions.getDataPackage(DataPackageJsonUrl))
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props

  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}

function mapStateToProps(state) {
  const { datapackage, resources } = state

  return {
    datapackage: datapackage,
    resources: resources
  }
}

export default connect(mapStateToProps)(PlotlyChart)
