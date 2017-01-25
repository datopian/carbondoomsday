import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';

import DataPackagePanel from "../../../../src/components/dataPackageView/DataPackagePanel";

describe("<DataPackagePanel />", () => {
  it("should render blank div if spec is empty", () => {
    const wrapper = shallow(<DataPackagePanel specs={{}}/>);
    expect(wrapper.html()).toEqual('<div></div>');

  });
  it("should not render <DataPackagePanelItem />", () => {
    const wrapper = shallow(<DataPackagePanel specs={{}}/>);
    expect(wrapper.find("<DataPackagePanelItem />").length).toEqual(0);
  });
});
