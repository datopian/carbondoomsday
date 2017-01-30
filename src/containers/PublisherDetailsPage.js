import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as publisherPageActions from "../actions/publisherPageAction";
import PackageList from "../components/common/PackageList";
import PublisherDetails from "../components/publisherPage/PublisherDetails";
import {Grid, Row} from "react-bootstrap";

class PublisherDetailsPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.publisherPageActions.getAllPackageForPublisher(this.props.publisherName);
    this.props.publisherPageActions.getPublisherDetails(this.props.publisherName);
  }

  render() {
    debugger;
    return (
      <Grid>
        <Row className="show-grid">
          <PublisherDetails data={this.props.publisherDetails}/>
          <PackageList packageList={this.props.publisherPackages}
                       publisherName={this.props.publisherName}/>
        </Row>
      </Grid>
    );
  }
}

PublisherDetailsPage.propTypes = {
  publisherName: PropTypes.string.isRequired,
  publisherPackages: PropTypes.array.isRequired,
  publisherDetails: PropTypes.object.isRequired,
  publisherPageActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const publisherName = ownProps.params.publisher;
  const {data, details} = state.publisherPage;
  return {
    publisherPackages: data,
    publisherDetails: details,
    publisherName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    publisherPageActions: bindActionCreators(publisherPageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetailsPage);
