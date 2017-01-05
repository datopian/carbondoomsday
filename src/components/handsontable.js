import React from "react"
import Handsontable from "handsontable"

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const spec = {
      data: this.props.data,
      colHeaders: this.props.colHeaders,
      readOnly: true,
      width: 1136,
      height: 432,
      colWidths: 47,
      rowWidth: 27,
      stretchH: 'all',
      columnSorting: true,
      search: true
    }
    new Handsontable(document.getElementById('table'), spec)
  }

  render() {
    return (
      <div id="table"></div>
    )
  }
  
}

export default HandsOnTable
