import React from "react";
import ReactDOM from "react-dom";
import HandsOnTable from "./components/handsontable.js"
import PlotlyChart from "./components/plotly.js"
import VegaLiteChart from "./components/vegalite.js"
import DataPackageViewContainer from "./containers/DataPackageViewContainer"
import TabularResourceViewContainer from "./containers/TabularResourceViewContainer"
//redux:
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as actions from './actions/datapackageActions'

const store = configureStore(
  window.devToolsExtension && window.devToolsExtension()
);


// let divForChart = document.getElementsByClassName("vis")

ReactDOM.render(
  <Provider store={store}>
    <DataPackageViewContainer />
  </Provider>,
  document.getElementById("vis123")
);



