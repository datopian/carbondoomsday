import React, { PropTypes } from 'react'
import Handsontable from 'handsontable'

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Create and bind Handsontable when the container component triggers update
    new Handsontable(document.getElementById(`hTable${this.props.idx}`), this.props.spec)
  }

  componentWillUpdate(nextProps) {
    // Update Handsontable when new props are received
    new Handsontable(document.getElementById(`hTable${nextProps.idx}`), nextProps.spec)
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
