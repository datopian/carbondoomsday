import React, {PropTypes} from "react";
import _ from "lodash";

class PublisherDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {data} = this.props;
    let keys = _.keys(data);
    if (keys.length > 0) {
      return (
        <div className="container">
          <h1>{ data.name }</h1>
          <h2>{ data.title }</h2>
          <p>{ data.joined }</p>
        </div>
      );
    } else {
      return (
        <div className="container"/>
      );
    }
  }
}

PublisherDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default PublisherDetails;
