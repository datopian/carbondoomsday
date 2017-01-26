import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import PackageListItem from '../../../src/components/common/PackageListItem';

describe("<PackageListItem />", () => {
  it("render one panel item", () => {
    const wrapper = shallow(<PackageListItem name="header"
                                             title="title"
                                             publisherName="publisher"/>);
    expect(wrapper.find('div').length).toBe(3);
  });
  it("panel header would be same as name property", () => {
    const panelHeader = "this is header";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             title="title"
                                             publisherName="publisher"/>);
    expect(wrapper.find(".panel-title").text()).toBe('title [' + panelHeader + ']');
  });
  it("panel would have one button", () => {
    const panelHeader = "this is header";
    const description = "this is panel description";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             description={description}
                                             title="title"
                                             publisherName="publisher" />);
    expect(wrapper.find(".btn").length).toBe(1);
  });
  it("button anchor tag href will be same as packageUrl props", () => {
    const panelHeader = "vfx";
    const description = "this is panel description";
    const packageUrl = "publisher/vfx";
    const wrapper = shallow(<PackageListItem name={panelHeader}
                                             description={description}
                                             title="title one"
                                             publisherName="publisher"/>);
    expect(wrapper.find(".btn").nodes[0].props.children.props.href).toBe(packageUrl);
  });
});
