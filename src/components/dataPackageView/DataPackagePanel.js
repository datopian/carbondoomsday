import React, {PropTypes} from "react";
import _ from "lodash";
import DataPackagePanelItem from "./DataPackagePanelItem";

const DataPackagePanel = ({specs}) => {
  let keys = _.keys(specs);
  if (keys.length > 0) {
    return (
      <div>
        {Array.from(keys).map(key =>
          <DataPackagePanelItem key={key} idx={key} spec={specs[key]}/>
        )}
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
};

DataPackagePanel.propTypes = {
  specs: PropTypes.object.isRequired
};

export default DataPackagePanel;
