import React from "react"
import HandsonTable from "../js/handsonTable.js"
import _ from "underscore"

class Table extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      handsonTableSpec: {}
    } //just an initial state

  }

  componentDidMount() {

    let _this = this

    this.serverRequest = CSV.fetch({
        "url": "fixtures/dp1/data.csv"
      }).then((dataset) => {

        let options = new HandsonTable(dataset)
        _this.setState({
          handsonTableSpec: options.handsonTableSpec
        })

      })

  }

  componentWillUnmount() {
    this.serverRequest.abort() //finishing request
  }

  componentDidUpdate() {
    new Handsontable(document.getElementById('table'), this.state.handsonTableSpec)
  }

  render() {
    return (
      <div id="table"></div>
    )
  }
}

export default Table
