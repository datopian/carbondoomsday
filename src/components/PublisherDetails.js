import React, {PropTypes} from 'react';

class PublisherDetails extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
	  const {data} = this.props;
    if(data.description) {
      return (
        <div className="container">
          <h1>{ data.name }</h1>
          <p>{ data.description }</p>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>{ data.name }</h1>
      </div>
    )
  }
}

PublisherDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default PublisherDetails;
