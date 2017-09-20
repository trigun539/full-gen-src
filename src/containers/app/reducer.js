import { fromJS }         from 'immutable';
import {
	TOGGLE_NAVIGATION,
	INCREASE_TABINDEX,
	TOGGLE_HELP,
	SHOW_ALERT,
	HIDE_ALERT
}                         from './actions';

import ServerTagIcon      from './icons/tags/server-tag.png';
import ApplicationTagIcon from './icons/tags/apps-tag.png';
import DatabaseTagIcon    from './icons/tags/database-tag.png';
import SchemaTagIcon      from './icons/tags/schema-tag.png';
import TableTagIcon       from './icons/tags/table-tag.png';
import ColumnTagIcon      from './icons/tags/columns-tag.png';
import ColumnValueTagIcon from './icons/tags/column-values-tag.png';
import RecordSpecTagIcon  from './icons/tags/record-spec-tag.png';
import RecordTagIcon      from './icons/tags/record-tag.png';
import GroupTagIcon       from './icons/tags/group-tag.png';
import ElementTagIcon     from './icons/tags/element-tag.png';
import SegmentTagIcon     from './icons/tags/segment-tag.png';
import QueryTagTagIcon    from './icons/tags/query-tag-tag.png';

export const initialState = fromJS({
	tabIndex: 1,
	helpOpen: false,
	advancedSearchOpen: true,
	menuOpen: true,
	metadataObjects: {
		subjectArea: { name: 'Subject Area' },
		server: { name: 'Server', tag: ServerTagIcon, type: 'global', order: 1 },
		application: { name: 'Application', tag: ApplicationTagIcon, type: 'global', order: 2 },
		database: { name: 'Database', tag: DatabaseTagIcon, type: 'rdbms', order: 1 },
		schema: { name: 'Schema', tag: SchemaTagIcon, type: 'rdbms', order: 2 },
		table: { name: 'Table', tag: TableTagIcon, type: 'rdbms', order: 3 },
		column: { name: 'Column', tag: ColumnTagIcon, type: 'rdbms', order: 4 },
		columnValue: { name: 'Column Value', tag: ColumnValueTagIcon, type: 'rdbms', order: 5 },
		recordSpecification: { name: 'Record Specification', tag: RecordSpecTagIcon, type: 'mainframe', order: 1 },
		record: { name: 'Record', tag: RecordTagIcon, type: 'mainframe', order: 2 },
		group: { name: 'Group', tag: GroupTagIcon, type: 'mainframe', order: 3 },
		element: { name: 'Element', tag: ElementTagIcon, type: 'mainframe', order: 4 },
		segment: { name: 'Segment', tag: SegmentTagIcon, type: 'mainframe', order: 5 },
		queryTag: { name: 'Query Tag', tag: QueryTagTagIcon, type: 'mainframe', order: 6 }
	},
	alerts: []
});

export const config = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_NAVIGATION:
			return state.set('menuOpen', !state.get('menuOpen'));
		case INCREASE_TABINDEX:
			return state.set('tabIndex', state.get('tabIndex') + 1);
		case TOGGLE_HELP:
			return state.set('helpOpen', !state.get('helpOpen'));
		case SHOW_ALERT:
			return state.set('alerts', state.get('alerts').push(action.alert));
		case HIDE_ALERT:
			let newAlerts = [];
			let oldAlerts = state.get('alerts').toJS();

			oldAlerts.forEach(x => {
				if (x.message !== action.message) {
					newAlerts.push(x);
				}
			});

			return state.set('alerts', fromJS(newAlerts));
		default:
			return state;
	}
}
