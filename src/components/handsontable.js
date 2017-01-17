import React from "react"
import Handsontable from "handsontable"

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    new Handsontable(document.getElementById('table'), this.props.spec)
  }

  render() {
    return (
      <div id="table"></div>
    )
  }

}

export default HandsOnTable
