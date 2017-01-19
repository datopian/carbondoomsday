import React from "react"
import HandsOnTable from "../components/handsontable"
//connect redux:
import { connect } from 'react-redux'
import * as actions from '../actions/datapackageActions'

//This container component serves to get data resources
//and convert them into Handsontable spec.
export class TabularResourceViewContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      spec: []
    }
  }

  //Takes a single resource and returns Handsontable spec
  buildHandsontableSpec(data) {
    let spec = {
      data: data.slice(1), //excluding headers
      colHeaders: data[0], //selecting headers
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
      //check if resources are received by comparing descriptor's resources and
      //received data length
      if(nextProps.datapackage.resources.length == nextProps.resources[0].length) {
        //build Handsontable spec using related data resource
        let spec = await this.buildHandsontableSpec(nextProps.resources[0][this.props.idx])
        this.setState({
          spec: spec
        })
      }
    }
  }

  render() {
    //render HandsOnTable component, pass spec and index of table
    return (
      <HandsOnTable spec={this.state.spec} idx={this.props.idx} />
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
