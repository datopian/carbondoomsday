import React from "react"
import HandsonTable from "../js/handsonTable.js"
import DataPackage from "../js/dataPackage.js"
import ReclineView from "../js/reclineToPlotly.js"
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
      .get(DataPackageJsonUrl)
      .then((result) => {

        let dpJson = result.data
        let dp
        if (dpJson.views[0].spec === undefined) {
          dp = new ReclineView(dpJson)
        } else {
          dp = new DataPackage(dpJson)
        }

        axios.get(dp.getResourcePath())
          .then((result) => {
            let parsedCSV = Papa.parse(result.data)

            let options = new HandsonTable(parsedCSV.data)
            _this.setState({
              handsonTableSpec: options.handsonTableSpec
            })

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
