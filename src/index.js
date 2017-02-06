import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/handsontable/dist/handsontable.full.min.css";
import configureStore from "./store/configureStore";
import DataPackageView from "./containers/DataPackageView"; // eslint-disable-line


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <DataPackageView packageName={packageName} publisherName={publisherName}/>
  </Provider>, document.getElementById("vis")
);



