import React, { PropTypes } from 'react'
import Handsontable from 'handsontable'
import * as viewutils from '../../utils/view'

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
    let compiledViewSpec = {
      resources: [this.props.resource],
      specType: 'handsontable'
    }
    let spec = viewutils.handsOnTableToHandsOnTable(compiledViewSpec)
    this.state = {
      spec: spec,
      idx: this.props.idx
    }
  }

  componentDidMount() {
    // Create and bind Handsontable when the container component triggers update
    new Handsontable(document.getElementById(`hTable${this.state.idx}`), this.state.spec)
  }

  render() {
    const divId = `hTable${this.props.idx}`
    return (
      <div id={divId} />
    )
  }
}
// HandsOnTable.propTypes = {
//   idx: PropTypes.string.required,
//   spec: PropTypes.object
// };

export default HandsOnTable
