import React, {PropTypes} from "react";
import PlotlyChart from "../components/plotly";
import VegaLiteChart from "../components/vegalite";
import HandsOnTable from "../components/handsontable";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../actions/datapackageActions';

//This container component listens to updates in datapackage and resources from
//the Redux Store. It then generates either Plotly or Vega-lite spec and renders
//appropriate chart.
export class DataPackageViewContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      specs:{}
    };
    this.chartRow = this.chartRow.bind(this);
  }

  componentDidMount(){
    let url = "https://raw.githubusercontent.com/anuveyatsu/test_data/master/datapackage.json";
    this.props.dataPackageActions.getDataPackage(url);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.datapackage.resources) {
      //check if resources are received by comparing descriptor's resources and
      //received data length
      if(nextProps.datapackage.resources.length === nextProps.resources[0].length) {
        let specs = this.getSpecsFromNextProps(nextProps.datapackage, nextProps.resources[0]);
        this.setState({specs: specs});
      }
    }
  }

  getSpecsFromNextProps(datapackage, resources){
    let specs = {};
    resources.map(function (resource, index) {
      let graphType;
      let spec = {};
      if(datapackage.views) {
        graphType = datapackage.views[index].type;
      }
      let htSpec = this.generateHandsontableSpec(resources[0][index]);
      spec.set({htSpec: htSpec});
      if(graphType === "vega-lite") {
        let vlSpec = this.generateVegaLiteSpec(resources[0][index], datapackage.views[index]);
        spec.set({graphType: graphType, vlSpec: vlSpec});
      } else {
        let plotlySpec = this.generatePlotlySpec(resources[0][index], datapackage, index);
        spec.set({graphType: graphType, plotlySpec: plotlySpec});
      }
      specs.set({index: spec});
    });
    return specs;
  }

  //Takes data and view, then generates vega-lite specific spec.
  generateVegaLiteSpec(data, view) {
    let vlSpec = {
      "width": 900,
      "height": 400,
      "data": {"values": []},
      "layers": []
    };
    let headers = data[0];
    vlSpec.data.values = data.slice(1).map(values => {
      return headers.reduce((o, k, i) => {
        o[k] = values[i];
        return o;
      }, {});
    });
    for(let i=0; i<view.state.series.length; i++) {
      let layer = {
        "mark": "line",
        "encoding": {
          "x": {"field": "", "type": "temporal"},
          "y": {"field": "", "type": "quantitative"}
        }
      };
      layer.encoding.x.field = view.state.group;
      layer.encoding.y.field = view.state.series[i];
      vlSpec.layers.push(layer);
    }
    return vlSpec;
  }

  //Takes a single resource and descriptor, then converts resource into Plotly
  //specific format and generates plotlySpec.
  generatePlotlySpec(data, dp, index) {
    let plotlySpec = {};
    let dataset = [];
    let group = dp.views[index].state.group;
    let series = dp.views[index].state.series;
    let xIndex;
    let yIndex = [];
    debugger;
    data.forEach((header, index) => {
      if(header === group) {xIndex = index;}
      series.forEach(serie => {
        if(header === serie) {yIndex.push(index);}
      });
    });
    for (let i = 0; i < series.length; i++) {
      dataset.push({x: [], y: [], mode: "lines", name: series[i]});
      dataset[i].x = data.slice(1).map(row => row[xIndex]);
      dataset[i].y = data.slice(1).map(row => row[yIndex[i]]);
    }

    let layout = {
      "xaxis": {
        "title": dp.views[index].state.group
      }
    };
    plotlySpec.data = dataset;
    plotlySpec.layout = layout;
    return plotlySpec;
  }

  //Takes a single resource and returns Handsontable spec
  generateHandsontableSpec(data) {
    return {
      data: data.slice(1), //excluding headers
      colHeaders: data[0], //selecting headers
      readOnly: true,
      width: 1136,
      height: function () {
        if (data.length > 16) {
          return 432;
        }
      },
      colWidths: 47,
      rowWidth: 27,
      stretchH: 'all',
      columnSorting: true,
      search: true
    };
  }

  chartRow(spec, index){
    debugger;
    if(spec.graphType === "vega-lite") {
      return (
        <div>
          <VegaLiteChart vlSpec={spec.vlSpec} idx={index} />
          <HandsOnTable spec={spec.htSpec} idx={index} />
        </div>
      );
    }
    return (
      <div>
        <PlotlyChart
          data={spec.plotlySpec.data}
          layout={spec.plotlySpec.layout}
          idx={index} />
        <HandsOnTable spec={this.state.htSpec} idx={index} />
      </div>
    );
  }

  render() {
    //Check if graph type is vega-lite. If so render VegaLiteChart with vlSpec.
    //Else render PlotlyChart component and pass data, layout, and index.
    if (this.state.specs.size > 0){
      return (
        <div>
          { this.state.specs.map(this.chartRow) }
        </div>
      );
    }
    else{
      return (
        <div>""</div>
      );
    }
  }
}

DataPackageViewContainer.propTypes = {
  dataPackageActions: PropTypes.object
};

function mapStateToProps (state) {
  const { datapackage, resources } = state;

  return {
    datapackage: datapackage,
    resources: resources
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataPackageActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPackageViewContainer);
