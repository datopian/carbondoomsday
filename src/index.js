import React from "react";
import ReactDOM from "react-dom";
import Chart from "./components/lineChart.js";
import PlotlyChart from "./components/plotlyChart.js";
import Table from "./components/table.js";

ReactDOM.render(
  <Chart />,
  document.getElementById("root")
);

ReactDOM.render(
  <Table />,
  document.getElementsByClassName("resource-info")[0]
);
