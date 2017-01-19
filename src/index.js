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
)

store.dispatch(actions.getDataPackage(DataPackageJsonUrl))

let divForChart = document.getElementsByClassName("vis")

for(let i=0; i<divForChart.length; i++) {
  ReactDOM.render(
    <Provider store={store}>
      <DataPackageViewContainer idx={i} />
    </Provider>,
    document.getElementsByClassName("vis")[i]
  );
}

/*
ReactDOM.render(
  <VegaLiteChart data={[{x: '2014-01-02', y: 5}, {x: '2014-01-03', y: 8}]} />,
  document.getElementById("root")
);
*/

let resource_info = document.getElementsByClassName("resource-info")

for(let i=0; i<resource_info.length; i++) {
  ReactDOM.render(
    <Provider store={store}>
      <TabularResourceViewContainer idx={i} />
    </Provider>,
    document.getElementsByClassName("resource-info")[i]
  );
}
