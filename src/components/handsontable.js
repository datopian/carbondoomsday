import React from "react"
import Handsontable from "handsontable"

class HandsOnTable extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    //Create and bind Handsontable when the container component triggers update 
    new Handsontable(document.getElementById('hTable' + this.props.idx), this.props.spec)
  }

  render() {
    let divId = "hTable" + this.props.idx
    return (
      <div id={divId}></div>
    )
  }

}

export default HandsOnTable
