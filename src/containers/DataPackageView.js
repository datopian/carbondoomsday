import React, {PropTypes} from 'react';
import DataPackagePanel from '../components/dataPackageView/DataDisplayPanel';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../actions/datapackageActions";
import * as view from "../utils/view";

//This container component listens to updates in datapackage and resources from
//the Redux Store. It then generates either Plotly or Vega-lite spec and renders
//appropriate chart.
export class DataPackageView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      specs: {}
    };
  }

  componentDidMount() {
    this.props.dataPackageActions.getDataPackage(this.props.publisherName, this.props.packageName);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.descriptor.resources) {
      //check if resources are received by comparing descriptor's resources and
      //received data length
      if (nextProps.descriptor.resources.length === nextProps.resources.length) {
        let specs = await this.getSpecsFromNextProps(nextProps.descriptor, nextProps.resources);
        this.setState({specs: specs});
      }
    }
  }

  async getSpecsFromNextProps(datapackage, resources) {
    let specs = {};

    for (let i = 0; i < resources.length; i++) {
      let graphType;
      let spec = {};
      if (datapackage.views) {
        graphType = datapackage.views[i].type
      }
      spec['htSpec'] = view.generateHandsontableSpec(resources[i]);
      if (graphType === "vega-lite") {
        let vlSpec = view.generateVegaLiteSpec(resources[i], datapackage.views[i]);
        spec['graphType'] = graphType;
        spec['vlSpec'] = vlSpec;
      } else {
        let plotlySpec = view.generatePlotlySpec(datapackage.views[i], resources[i]);
        spec['graphType'] = graphType;
        spec['plotlySpec'] = plotlySpec;
      }
      specs[i] = spec;
    }
    return specs;
  }

  render() {
    return (
        <DataPackagePanel specs={this.state.specs} />
    );
  }
}

DataPackageView.propTypes = {
  packageName: PropTypes.string.isRequired,
  publisherName: PropTypes.string.isRequired,
  dataPackageActions: PropTypes.object,
  readme: PropTypes.string,
  descriptor: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const {descriptor, resources, readme} = state.dpr;

  return {
    descriptor: descriptor,
    resources: resources,
    readme: readme
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataPackageActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPackageView);
