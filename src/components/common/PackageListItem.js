import React, {PropTypes} from "react";

class PackageListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {name, description, packageUrl} = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title pull-left">{name}</h3>
          <button className="btn btn-success pull-right">
            <a href={packageUrl}>Explore >></a>
          </button>
          <div className="clearfix"></div>
        </div>
        <div className="panel-body">{description}</div>
      </div>
    );
  }
}

PackageListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  packageUrl: PropTypes.string.isRequired
};

export default PackageListItem;
