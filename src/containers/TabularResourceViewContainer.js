import React from "react"
import HandsOnTable from "../components/handsontable"
//connect redux:
import { connect } from 'react-redux'
import * as actions from '../actions/datapackageActions'

export class TabularResourceViewContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      spec: []
    }
  }

  buildHandsontableSpec(data) {
    let spec = {
      data: data.slice(1),
      colHeaders: data[0],
      readOnly: true,
      width: 1136,
      height: function(){
        if (data.length > 16) {return 432;}
      },
      colWidths: 47,
      rowWidth: 27,
      stretchH: 'all',
      columnSorting: true,
      search: true
    }
    return spec
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.datapackage) {
      if(nextProps.datapackage.resources.length == nextProps.resources.length) {
        let spec = await this.buildHandsontableSpec(nextProps.resources[0][this.props.idx])
        this.setState({
          spec: spec
        })
      }
    }
  }

  render() {
    return (
      <HandsOnTable spec={this.state.spec} />
    )
  }
}

const mapStateToProps = (state) => {
  const { datapackage, resources } = state

  return {
    datapackage: datapackage,
    resources: resources
  }
}

export default connect(mapStateToProps)(TabularResourceViewContainer)
