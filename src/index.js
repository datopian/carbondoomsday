import React from "react";
import ReactDOM from "react-dom";
import HandsOnTable from "./components/handsontable.js"
import PlotlyChart from "./components/plotly.js"
import VegaLiteChart from "./components/vegalite.js"

ReactDOM.render(
  <PlotlyChart data={[{x: ['2014-01-02', '2014-01-03'], y: [5, 8], mode: "lines"}]} />,
  document.getElementById("root")
);

ReactDOM.render(
  <VegaLiteChart data={[{x: '2014-01-02', y: 5}, {x: '2014-01-03', y: 8}]} />,
  document.getElementById("root")
);

ReactDOM.render(
  <HandsOnTable data={[[1,2],[3,4],[5,6]]} colHeaders={["f","s"]} />,
  document.getElementsByClassName("resource-info")[0]
);
