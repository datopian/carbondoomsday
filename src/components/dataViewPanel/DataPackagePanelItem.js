import React, {PropTypes} from "react";
import HandsOnTable from "../handsontable";
import PlotlyChart from "../plotly";
import VegaLiteChart from "../vegalite";


const DataPackagePanelItem = ({idx, spec}) => {
  //Check if graph type is vega-lite. If so render VegaLiteChart with vlSpec.
  //Else render PlotlyChart component and pass data, layout, and index.
  return (
    <div>
      {
        spec.graphType === "vega-lite" ?
          <VegaLiteChart vlSpec={spec.vlSpec} idx={idx}/>
          : <PlotlyChart data={spec.plotlySpec.data} layout={spec.plotlySpec.layout} idx={idx}/>
      }
      <HandsOnTable spec={spec.htSpec} idx={idx}/>
    </div>
  );
};

DataPackagePanelItem.propTypes = {
  spec: PropTypes.object.isRequired
};

export default DataPackagePanelItem;
