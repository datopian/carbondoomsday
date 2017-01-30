import React, {PropTypes} from "react";
import PackageListItem from "./PackageListItem";
import {Col, Row, Button} from "react-bootstrap";

const PackageList = ({publisherName, packageList}) => {
  debugger;
  let l = packageList.length;
  return (
    <Col sm={5} className="offset-sm-2">
      <div className="card mb-2">
        <div className="card-block">
          <Row className="show-grid">
            <Col sm={6}>
              <h3>Data packages</h3>
            </Col>
            <Col sm={6}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                  <Button bsStyle="secondary">Go!</Button>
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {
        l > 0 ?
          packageList.map(packageItem =>
            <PackageListItem key={publisherName + "::" + packageItem.name}
                             name={packageItem.name}
                             publisherName={publisherName}
                             description={packageItem.readme.substring(0, 50)}
                             title={packageItem.descriptor.title}/>
          ) : ''
      }
    </Col>
  );
};

PackageList.propTypes = {
  packageList: PropTypes.array.isRequired,
  publisherName: PropTypes.string.isRequired
};

export default PackageList;
