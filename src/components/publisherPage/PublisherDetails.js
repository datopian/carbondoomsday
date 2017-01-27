import React, {PropTypes} from "react";
import Gravatar from "react-gravatar";
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
        <div className="container pull-left col-lg-6">
          <Gravatar email="neo20iitkgp@gmail.com" size={100}/>
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
