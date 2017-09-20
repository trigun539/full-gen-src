import { fromJS }              from 'immutable';
import React                   from 'react';
import { Provider }            from 'react-redux';
import { expect }              from 'chai';
import { mount, shallow }      from 'enzyme';
import { spy }                 from 'sinon';
import ConnectedHome, { Home } from 'containers/home/home';
import ConnectedHomeInjector   from 'inject-loader!containers/home/home';

const push = (url) => { return url; };

const fakeStore = (state) => ({
	default () {},
	subscribe () {},
	dispatch () {},
	getState () { return state }
});

const props = {
	tags: {},
	subscriptions: [
		{ businessName: 'a', physicalName: 'b', type: 'database' },
		{ businessName: null, physicalName: 'b', type: 'schema' }
	],
	comments: [
		{ businessName: 'a', physicalName: 'b' },
		{ businessName: null, physicalName: 'b' }
	],
	toggleTagFilter () {},
	subscriptionsLoading: false,
	commentsLoading: false,
	subjectAreas: [
		{ color: 'blue', icon: 'icon.png', name: 'a name'}
	],
	commentsPage: 1,
	commentsLimit: 5,
	requestComments () {},
	loadedAllComments: false,
	push () {},
	requestSubscriptions () {}
};

describe('Containers :: Home ::', () => {

	it('should show homepage', () => {
		const requestSubscriptionsSpy = spy();
		const requestCommentsSpy = spy();
		const newProps = {
			...props,
			requestComments: requestCommentsSpy,
			requestSubscriptions: requestSubscriptionsSpy
		};
		const wrapper = shallow(<Home { ...newProps } />);

		expect(requestSubscriptionsSpy.called).to.be.true;
		expect(requestCommentsSpy.called).to.be.true;
		expect(requestCommentsSpy.calledWith(props.commentsPage, props.commentsLimit)).to.be.true;
		expect(wrapper.find('Panel').length).to.be.equal(2);
		expect(wrapper.find('FilterableList')).to.be.ok;
		expect(wrapper.find('CommentFeed')).to.be.ok;
		expect(wrapper.find('CommentFeed').props().title).to.be.equal('Recent Activity');
		expect(wrapper.find('CommentFeed').props().loading).to.be.false;
		expect(wrapper.find('CommentFeed').props().comments)
			.to.deep.equal([
				{ businessName: 'a', physicalName: 'b', name: 'a' },
				{ businessName: null, physicalName: 'b', name: 'b' }
			]);
		expect(wrapper.find('Panel').at(0).props().title).to.be.equal('Subscriptions');
		expect(wrapper.find('Panel').at(0).childAt(0).props().items).to.deep.equal([
			{ text: 'a', tag: 'database', link: '' },
			{ text: 'b', tag: 'schema', link: '' }
		]);
	});

	it('should show loader when loading subscriptions', () => {
		const newProps = {
			...props,
			subscriptionsLoading: true
		};
		const wrapper = shallow(<Home { ...newProps } />);

		expect(wrapper.find('Loader').length).to.be.equal(1);
	});

	it('should go to subject areas page', () => {
		const pushSpy = spy();
		const newProps = {
			...props,
			push: pushSpy
		};
		const wrapper = shallow(<Home { ...newProps }/>);

		wrapper.find('Panel').find('button').simulate('click');

		expect(pushSpy.called).to.be.true;
		expect(pushSpy.calledWith('/subject-areas')).to.be.true;
	});

	it('should load more comments', () => {
		const requestCommentsSpy = spy();
		const newProps = {
			...props,
			commentsLoading: false,
			requestComments: requestCommentsSpy
		};
		const wrapper = shallow(<Home { ...newProps }/>);

		wrapper.find('CommentFeed').props().loadMore();

		expect(requestCommentsSpy.called).to.be.true;
		expect(requestCommentsSpy.callCount).to.be.equal(2);
		expect(requestCommentsSpy.calledWith(newProps.commentsPage + 1, newProps.commentsLimit)).to.be.true;
	});

	it('should not load more comments', () => {
		const requestCommentsSpy = spy();
		const newProps = {
			...props,
			commentsLoading: false,
			loadedAllComments: true,
			requestComments: requestCommentsSpy
		};
		const wrapper = shallow(<Home { ...newProps }/>);

		wrapper.find('CommentFeed').props().loadMore();

		// Only once when mounted
		expect(requestCommentsSpy.callCount).to.be.equal(1);
	});

	it('should attach state and actions', () => {
		const store = fakeStore(fromJS({
			home: props
		}));

		const wrapper = mount(
			<Provider store={ store }>
				<ConnectedHome />
			</Provider>
		);

		expect(wrapper).to.be.ok;
		expect(wrapper.find('Panel').length).to.be.equal(2);
		expect(wrapper.find('FilterableList')).to.be.ok;
		expect(wrapper.find('CommentFeed')).to.be.ok;
		expect(wrapper.find('CommentFeed').props().title).to.be.equal('Recent Activity');
		expect(wrapper.find('CommentFeed').props().loading).to.be.false;
		expect(wrapper.find('CommentFeed').props().comments)
			.to.deep.equal([
				{ businessName: 'a', physicalName: 'b', name: 'a' },
				{ businessName: null, physicalName: 'b', name: 'b' }
			]);
		expect(wrapper.find('Panel').at(0).props().title).to.be.equal('Subscriptions');
		expect(wrapper.find('FilterableList').props().items).to.deep.equal([
			{ text: 'a', tag: 'database', link: '' },
			{ text: 'b', tag: 'schema', link: '' }
		]);
	});

	it('should dispatch toggleTagFilter when filter is clicked', () => {
		const store = fakeStore(fromJS({
			home: props
		}));

		const toggleTagFilterSpy = spy();
		const TheConnectedHome = ConnectedHomeInjector({
			'./actions': {
				toggleTagFilter: toggleTagFilterSpy,
				requestSubscriptions () {},
				requestComments () {}
			},
		}).default;

		const wrapper = mount(
			<Provider store={ store }>
				<TheConnectedHome />
			</Provider>
		);

		wrapper.find('FilterableList').props().filterHandler('database');

		expect(toggleTagFilterSpy.called).to.be.true;
		expect(toggleTagFilterSpy.calledWith('database')).to.be.true;
	});

	it('should fire push action when view all subject areas link clicked', () => {
		const store = fakeStore(fromJS({
			home: props
		}));

		const pushSpy = spy();
		const TheConnectedHome = ConnectedHomeInjector({
			'react-router-redux': {
				push: pushSpy
			}
		}).default;

		const wrapper = mount(
			<Provider store={ store }>
				<TheConnectedHome />
			</Provider>
		);

		wrapper.find('Panel').find('button').simulate('click');

		expect(pushSpy.called).to.be.true;
		expect(pushSpy.calledWith('/subject-areas')).to.be.true;
	});

});
