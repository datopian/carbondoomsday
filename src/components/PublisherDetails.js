import React, {PropTypes} from 'react';

class PublisherDetails extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
	  const {data} = this.props;
    return (
      <div className="container">
        <h1>{ data.name }</h1>
        <h2>{ data.title }</h2>
        <p>{ data.joined }</p>
      </div>
    )
  }
}

PublisherDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default PublisherDetails;
