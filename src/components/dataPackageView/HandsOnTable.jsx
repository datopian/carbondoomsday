import React, { PropTypes } from 'react'
import Handsontable from 'handsontable'
const Spinner = require('react-spinkit')

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hot: null
    }
  }

  componentDidMount() {
    // Create and bind Handsontable when the container component triggers update
    let hot = new Handsontable(document.getElementById(`hTable${this.props.idx}`), this.props.spec)
    this.setState({
      hot: hot
    })
  }

  componentWillUpdate(nextProps) {
    // Update Handsontable when new props are received
    if(this.state.hot) {
      this.state.hot.updateSettings(nextProps.spec)
    }
  }

  render() {
    const divId = `hTable${this.props.idx}`
    return (
      <div>
        { this.props.spec.viewTitle && <h3>{this.props.spec.viewTitle}</h3> }
        <div id={divId} className="handsontable">
          { !this.props.spec.data && <Spinner spinnerName="rotating-plane"/> }
        </div>
      </div>
    )
  }
}
// HandsOnTable.propTypes = {
//   idx: PropTypes.string.required,
//   spec: PropTypes.object
// };

export default HandsOnTable
