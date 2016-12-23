import React from "react"
import axios from "axios"
import DataPackage from "../js/dataPackage.js"
import ReclineView from "../js/reclineToPlotly.js"
import Papa from "papaparse"


class Chart extends React.Component {

  constructor(props) {

    super(props)

    this.state = {myVegaSpec: {}} //just an initial state

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
        let myVegaSpec = dp.vlSpec
        axios.get(dp.getResourcePath())
          .then((result) => {
            let parsedCSV = Papa.parse(result.data, {
              header: true,
              dynamicTyping: true
            })
            
            myVegaSpec.data["values"] = parsedCSV.data

            _this.setState({
              myVegaSpec: myVegaSpec
            })

          })

      })

  }

  componentWillUnmount() {
    this.serverRequest.abort() //finishing request
  }

  componentDidUpdate() {
    vg.embed("#vis", {mode: "vega-lite", spec: this.state.myVegaSpec, actions: false})
  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}

export default Chart
