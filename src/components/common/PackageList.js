import React, {PropTypes} from "react";
import PackageListItem from "./PackageListItem";

const PackageList = ({publisherName, packageList}) => {
  let l = packageList.length;
  return (
    <div className="panel-group pull-right col-lg-6">
      <div className="panel panel-default">
        <div className="panel-body ">
          Publisher Package List
        </div>
      </div>

      {
        l > 0 ?
        packageList.map(packageItem =>
        <PackageListItem key={publisherName + "::" +packageItem.name}
                         name={packageItem.name}
                         packageUrl={packageItem.url}
                         description={packageItem.description}/>
        ) : ''
      }
    </div>
  );
};

PackageList.propTypes = {
  packageList: PropTypes.array.isRequired,
  publisherName: PropTypes.string.isRequired
};

export default PackageList;
