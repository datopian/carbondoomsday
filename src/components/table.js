import React from "react"
import HandsonTable from "../js/handsonTable.js"
import axios from "axios"
import Papa from "papaparse"

class Table extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      handsonTableSpec: {}
    } //just an initial state

  }

  componentDidMount() {

    let _this = this

    this.serverRequest = axios
      .get("fixtures/dp1/data.csv")
      .then((result) => {
        let parsedCSV = Papa.parse(result.data)

        let options = new HandsonTable(parsedCSV.data)
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
