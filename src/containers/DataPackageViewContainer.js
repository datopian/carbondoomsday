import React, {PropTypes} from "react";
import DataPackagePanel from "../components/dataViewPanel/DataPackagePanel";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from '../actions/datapackageActions';

//This container component listens to updates in datapackage and resources from
//the Redux Store. It then generates either Plotly or Vega-lite spec and renders
//appropriate chart.
class DataPackageViewContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      specs:{}
    };
  }

  componentDidMount(){
    let url = "https://raw.githubusercontent.com/anuveyatsu/test_data/master/datapackage.json";
    this.props.dataPackageActions.getDataPackage(url);
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.datapackage.resources) {
      //check if resources are received by comparing descriptor's resources and
      //received data length
      if(nextProps.datapackage.resources.length === nextProps.resources.length) {
        let specs = await this.getSpecsFromNextProps(nextProps.datapackage, nextProps.resources);
        this.setState({specs: specs});
      }
    }
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
  generatePlotlySpec(data, dp, j) {
    let plotlySpec = {};
    let dataset = [];
    let group = dp.views[j].state.group;
    let series = dp.views[j].state.series;
    let xIndex;
    let yIndex = [];
    data[0].forEach((header, index) => {
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
        "title": dp.views[j].state.group
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

  async getSpecsFromNextProps(datapackage, resources){
    let specs = {};

    for (let i=0; i<resources.length; i++) {
      let graphType;
      let spec = {};
      if(datapackage.views) {
        graphType = datapackage.views[i].type;
      }
      spec['htSpec'] = this.generateHandsontableSpec(resources[i]);
      if(graphType === "vega-lite") {
        let vlSpec = this.generateVegaLiteSpec(resources[i], datapackage.views[i]);
        spec['graphType'] = graphType;
        spec['vlSpec'] = vlSpec;
      } else {
        let plotlySpec = this.generatePlotlySpec(resources[i], datapackage, i);
        spec['graphType'] = graphType;
        spec['plotlySpec'] = plotlySpec;
      }
      specs[i] = spec;
    }
    return specs;
  }

  render() {
    return (
      <DataPackagePanel specs={this.state.specs}/>
    );
  }
}

DataPackageViewContainer.propTypes = {
  dataPackageActions: PropTypes.object
};

function mapStateToProps (state, ownProps) {
  const { datapackage, resources } = state.dpr;

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
