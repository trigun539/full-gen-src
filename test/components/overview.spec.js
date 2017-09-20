import React                                     from 'react';
import { expect }                                from 'chai';
import { shallow }                               from 'enzyme';
import { Link }                                  from 'react-router';
// eslint-disable-next-line import/no-duplicates
import Overview                                  from 'components/overview/overview';
// eslint-disable-next-line import/no-duplicates
import OverviewInjector                          from 'inject-loader!components/overview/overview';

const props = {
  items: [
    { label: 'Item 2', value: 'Test 2', order: 2, link: '/databases/PT18' },
    { label: 'Item 3', value: 'Test 3', order: 3 },
    { label: 'Item 1', value: 'Test 1', order: 1 },
    { label: 'Item 4', value: 'Test 4' }
  ]
};

describe('Component :: <Overview /> ::', () => {
  it('should display overview items', () => {
    const TheOverview = OverviewInjector({
      './styles.css': {
        wrapper: 'wrapper',
        item: 'item',
        'item-label': 'item-label',
        'item-value': 'item-value',
        'item-link': 'item-link'
      }
    }).default;
    const wrapper = shallow(<TheOverview { ...props } />);

    // Labels
    expect(wrapper.find('.item-label').at(0).text()).to.be.equal(props.items[0].label);
    expect(wrapper.find('.item-label').at(1).text()).to.be.equal(props.items[1].label);
    expect(wrapper.find('.item-label').at(2).text()).to.be.equal(props.items[2].label);
    expect(wrapper.find('.item-label').at(3).text()).to.be.equal(props.items[3].label);

    // Values
    expect(wrapper.find('.item-value').at(0).text()).to.be.equal(props.items[0].value);
    expect(wrapper.find('.item-value').at(2).text()).to.be.equal(props.items[2].value);
    expect(wrapper.find('.item-value').at(3).text()).to.be.equal(props.items[3].value);

    // Link item
    const link = wrapper.find('.item-value').at(1).childAt(0);

    expect(link.type()).to.be.equal(Link);
    expect(link.props().children).to.be.equal(props.items[1].value);
    expect(link.props().to).to.be.equal(props.items[1].link);
  });

  it('should display nothing if no items given', () => {
    const wrapper = shallow(<Overview />);

    expect(wrapper.type()).to.be.equal('ul');
    expect(wrapper.find('li').length).to.be.equal(0);
  });
});
