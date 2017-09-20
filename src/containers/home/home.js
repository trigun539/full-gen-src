import React, { Component } from 'react';
import Immutable            from 'immutable';
import { connect }          from 'react-redux';
import styles               from './styles.css';
import Panel                from 'components/panel/panel';
import FilterableList       from 'components/filterable-list/filterable-list';
import CommentFeed          from 'components/comment-feed/comment-feed';
import Loader               from 'components/loading/loading';
import HomeBlock            from 'components/home-block/home-block';
import {
	toggleTagFilter,
	requestSubscriptions,
	requestComments
}                           from './actions';
import { push }             from 'react-router-redux';

export class Home extends Component {

	componentWillMount () {
		const {
			requestSubscriptions,
			requestComments,
			commentsPage,
			commentsLimit
		} = this.props;

		requestSubscriptions();
		requestComments(commentsPage, commentsLimit);
	}

	render () {
		const {
			tags,
			subscriptions,
			comments,
			toggleTagFilter,
			subscriptionsLoading,
			commentsLoading,
			subjectAreas,
			commentsPage,
			commentsLimit,
			requestComments,
			loadedAllComments,
			push
		} = this.props;

		// Formatting subscriptions
		const formattedSubscriptions = [];

		subscriptions.forEach(x => {
			formattedSubscriptions.push({
				text: x.businessName || x.physicalName,
				link: '',
				tag: x.type
			});
		});

		// Formatting comments
		const formattedComments = [];

		comments.forEach(x => {
			formattedComments.push({
				...x,
				name: x.businessName || x.physicalName,
			});
		});

		// Building subject area blocks
		const subjectAreasHTML = [];

		subjectAreas.slice(0, 8).forEach((x, i) => {
			subjectAreasHTML.push(<HomeBlock key={`susdf-${i}`} title={ x.name } icon={ x.icon } color={ x.color } />);
		});

		return (
			<div className={ styles.home } >
				
				<div className={ styles['left-holder'] }>

					<div id="subscriptions" className={ styles['subscriptions-holder'] }>
						<Panel title="Subscriptions" >
							{ (() => {
								if (subscriptionsLoading) {
									return <Loader />;
								} else {
									return <FilterableList items={ formattedSubscriptions } tags={ tags } filterHandler={ toggleTagFilter } />;
								}
							})() }
						</Panel>
					</div>

					<div id="subject-areas" className={ styles['subject-areas-holder'] }>
						<Panel title="Subject Areas">
							{ subjectAreasHTML }

							<button className={ styles['btn-accent'] } onClick={ () => { push('/subject-areas'); }}>VIEW ALL</button>
						</Panel>
					</div>

				</div>

				<div className={ styles['right-holder'] }>
					<div className={ styles['recent-activity-holder'] }>
						{ (() => {
							const nextPage = parseInt(commentsPage, 10) + 1;

							return <CommentFeed 
								title="Recent Activity" 
								loading={ commentsLoading } 
								comments={ formattedComments } 
								loadMore={ () => {
									if (!loadedAllComments) {
										requestComments(nextPage, commentsLimit);
									}
								}} />;
						})() }
					</div>
				</div>

			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		subscriptions:         state.get('home').get('subscriptions').toJS(),
		subscriptionsLoading:  state.get('home').get('subscriptionsLoading'),
		tags:                  state.get('home').get('tags').toJS(),
		comments:              state.get('home').get('comments').toJS(),
		commentsPage:          state.get('home').get('commentsPage'),
		commentsLimit:         state.get('home').get('commentsLimit'),
		commentsLoading:       state.get('home').get('commentsLoading'),
		loadedAllComments:     state.get('home').get('loadedAllComments'),
		subjectAreas:          state.get('home').get('subjectAreas').toJS()
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleTagFilter (tag) { dispatch(toggleTagFilter(tag)); },
		requestSubscriptions () { dispatch(requestSubscriptions()); },
		requestComments (page, limit) { dispatch(requestComments(page, limit)); },
		push (page) { dispatch(push(page)); }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home); 
