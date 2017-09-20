import { fromJS }            from 'immutable';
import {
	TOGGLE_TAG_FILTER,
	REQUEST_SUBSCRIPTIONS_SUCCEEDED,
	REQUEST_SUBSCRIPTIONS_FAILED,
	REQUEST_SUBSCRIPTIONS_LOADING,
	REQUEST_COMMENTS_SUCCEEDED,
	REQUEST_COMMENTS_FAILED,
	REQUEST_COMMENTS_LOADING
}                                  from './actions';
import DatabaseIcon                from 'containers/app/icons/database-tag.png';
import SchemaIcon                  from 'containers/app/icons/schema-tag.png';

// Subject Areas Icons
import MedicareIcon from 'containers/app/icons/subject-areas/medicare.png';
import DisabilityIcon from 'containers/app/icons/subject-areas/disability.png';
import HearingsIcon from 'containers/app/icons/subject-areas/hearings.png';
import EarningsIcon from 'containers/app/icons/subject-areas/earnings.png';
import HumanResourcesIcon from 'containers/app/icons/subject-areas/human-resources.png';
import RetirementIcon from 'containers/app/icons/subject-areas/retirement.png';
import DocumentManagementIcon from 'containers/app/icons/subject-areas/document-management.png';
import CustomerServiceIcon from 'containers/app/icons/subject-areas/customer-service.png';

export const initialState = fromJS({
	subscriptions: [],
	subscriptionsLoading: true,
	commentsPage: 1,
	commentsLimit: 10,
	comments: [],
	commentsLoading: true,
	loadedAllComments: false,
	tags: {
		database: { name: 'Database', icon: DatabaseIcon, selected: true },
		schema: { name: 'Schema', icon: SchemaIcon, selected: true }
	},
	subjectAreas: [
		{ name: 'Medicare', icon: MedicareIcon, color: 'blue' },
		{ name: 'Disability', icon: DisabilityIcon, color: 'orange' },
		{ name: 'Hearings & Appeals', icon: HearingsIcon, color: 'purple' },
		{ name: 'Earnings', icon: EarningsIcon, color: 'greenDark' },
		{ name: 'Human Resources', icon: HumanResourcesIcon, color: 'greenLight' },
		{ name: 'Retirement/Survivors', icon: RetirementIcon, color: 'brown' },
		{ name: 'Document Management', icon: DocumentManagementIcon, color: 'blue' },
		{ name: 'Customer Service', icon: CustomerServiceIcon, color: 'yellow' }
	]
});

export const home = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SUBSCRIPTIONS_SUCCEEDED:
			return state
				.set('subscriptions', fromJS(action.subscriptions))
				.set('subscriptionsLoading', false);
		case REQUEST_SUBSCRIPTIONS_FAILED:
			return state
				.set('subscriptionsLoading', false);
		case REQUEST_SUBSCRIPTIONS_LOADING:
			return state
				.set('subscriptionsLoading', true);
		case TOGGLE_TAG_FILTER:
			return state
				.setIn(['tags', action.tag, 'selected'], !state.get('tags').get(action.tag).get('selected'));
		case REQUEST_COMMENTS_SUCCEEDED:
			if (action.comments.comments.length > 0) {
				return state
					.set('comments', fromJS([
						...state.get('comments').toJS(),
						...action.comments.comments
					]))
					.set('commentsPage', action.comments.page)
					.set('commentsLimit', action.comments.limit)
					.set('commentsLoading', false);
			} else {
				return state
					.set('commentsLoading', false)
					.set('loadedAllComments', true);
			}
		case REQUEST_COMMENTS_FAILED:
			return state
				.set('commentsLoading', false);
		case REQUEST_COMMENTS_LOADING:
			return state
				.set('commentsLoading', true);
		default:
			return state;
	}
}
