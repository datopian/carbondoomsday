import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PackageListItem from '../../../src/components/common/PackageListItem';

describe("<PackageListItem />", () => {
  it("render one panel item", () => {
    const wrapper = shallow(<PackageListItem name="header"
                                             packageUrl="core/demo-package" />);
    expect(wrapper.find('div').length).toBe(4);
  });
  it("panel header would be same as name property", () => {
    const panelHeader = "this is header";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             packageUrl="core/demo-package" />);
    expect(wrapper.find(".panel-title").text()).toBe(panelHeader)
  });
  it("panel body would be same as description property", () => {
    const panelHeader = "this is header";
    const description = "this is panel description";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             description={description}
                                             packageUrl="core/demo-package" />);
    expect(wrapper.find(".panel-body").text()).toBe(description);
  });
  it("panel would have one button", () => {
    const panelHeader = "this is header";
    const description = "this is panel description";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             description={description}
                                             packageUrl="core/demo-package" />);
    expect(wrapper.find(".btn").length).toBe(1);
  });
  it("button anchor tag href will be same as packageUrl props", () => {
    const panelHeader = "this is header";
    const description = "this is panel description";
    const packageUrl = "core/demo-package";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             description={description}
                                             packageUrl={packageUrl} />);
    expect(wrapper.find(".btn").nodes[0].props.children.props.href).toBe(packageUrl);
  })
});
