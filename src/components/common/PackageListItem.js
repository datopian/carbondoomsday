import React, {PropTypes} from "react";
import {Link} from "react-router";
import ReactMarkdown from "react-markdown";

class PackageListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {name, title, description, publisherName} = this.props;
    let packageUrl = publisherName + "/" + name;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title pull-left">{title} [{name}]</h3>
          <button className="btn btn-default pull-right">
            <Link to={packageUrl}>Explore >></Link>
          </button>
          <div className="clearfix"/>
        </div>
        { description !== undefined ?
          <ReactMarkdown className="panel-body" source={description}/>
          : ''
        }
        <h5> Publisher By :
          <Link to={"/" + publisherName}>{publisherName}</Link>
        </h5>
      </div>
    );
  }
}

PackageListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  publisherName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PackageListItem;
