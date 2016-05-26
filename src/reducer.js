
import { combineReducers } from 'redux';
import { action as Actions } from './action';

let initState = {
  	blog: {
  		category: {
  			current: 'all',
  			data: []
  		},
  		list: {
  			length: 0,
  			data: []
  		}
  	},
  	note: {
  		comment: [],
  		article: {}
  	},
  	demo: {
  		length: 0,
  		data: []
  	},
  	msg: {
  		length: 0,
  		data: []
  	},
  	status: {
  		first: true,
  		info: {
  			show: false,
  			name: '',
  			qq: ''
  		},
  		error: {
  			show: false,
  			msg: ''
  		},
  		dialog: {
  			show: false,
  			msg: ''
  		}
  	},
  	ui: {
  		showLoading: false,
  		showNav: false,
  		showTag: false,
  		bgd: ['f6ada6', 'd5f6a6', 'a6f6ee', 'a6bef6', 'c19ceb', 'eb9cbf', '9ceba1', '9cb6eb', 'eaeb9c', '9cebe4', 'e39ceb', 'a99ceb', '9ceb9e', 'ebd99c', 'eb9ca1', 'b4eb9c']
  	}
};
// 这里修正 initState 中用户本地存储的信息
try {
	let con = localStorage.getItem('info');
	if( con ) {
		let info = JSON.parse( con );
		initState.status.info.name = info.name;
		initState.status.info.qq = info.qq;
	}
} catch(err) {
	console.log( err );
}

let blogReducer = (state=initState.blog, action) => {
	switch(action.type) {
		case Actions.blog.PAGE_TURN:
		return Object.assign({}, state, {
			list: {
				length: action.length,
				data: state.list.data.concat( action.data )
			}
		});

		case Actions.blog.FILTER_TAG:
		return Object.assign({}, state, {
			category: {
				current: action.current,
				data: state.category.data
			},
			list: {
				length: action.length,
				data: action.data
			}
		});

		case Actions.blog.INIT_DATA:
		return Object.assign({}, state, {
			category: action.category,
			list: action.list
		});

		default:
		return state;
	}
};

let noteReducer = (state=initState.note, action) => {
	switch(action.type) {
		case Actions.note.INIT_DATA:
		return Object.assign({}, state, action, {
			article: action.article,
			comment: action.comment
		});

		case Actions.note.NEW_COMMENT:
		return Object.assign({}, state, {
			comment: action.comment
		});

		default:
		return state;
	}
};

let demoReducer = (state=initState.demo, action) => {
	switch(action.type) {
		case Actions.demo.INIT_DATA:
		return Object.assign({}, state, {
			length: action.length,
			data: action.data
		});

		case Actions.demo.PAGE_TURN:
		return Object.assign({}, state, {
			data: state.data.concat( action.data )
		});

		default:
		return state;
	}
};

let msgReducer = (state=initState.msg, action) => {
	switch( action.type ) {
		case Actions.msg.INIT_DATA:
		return Object.assign({}, state, {
			length: action.length,
			data: action.data
		});

		case Actions.msg.PAGE_TURN:
		return Object.assign({}, state, {
			data: state.data.concat( action.data )
		});

		default:
		return state;
	}
};

let statusReducer = (state=initState.status, action) => {
	switch( action.type ) {
		case Actions.status.UPDATE_INFO:
		return Object.assign({}, state, {
			info: {
				show: false,
				name: action.name,
				qq: action.qq
			}
		});

		case Actions.status.SHOW_INFO:
		return Object.assign({}, state, {
			info: {
				show: action.show
			}
		});

		case Actions.status.ERROR_SHOW:
		return Object.assign({}, state, {
			error: {
				show: action.show,
				msg: action.msg
			}
		});

		case Actions.status.DIALOG_SHOW:
		return Object.assign({}, state, {
			dialog: {
				show: action.show,
				msg: action.msg
			}
		});

		default:
		return state;
	}
};

let uiReducer = (state=initState.ui, action) => {
	switch( action.type ) {
		case Actions.ui.SHOW_NAV:
		return Object.assign({}, state, {
			showNav: action.showNav
		});

		case Actions.ui.SHOW_LOADING:
		return Object.assign({}, state, {
			showLoading: action.showLoading
		});

		case Actions.ui.SHOW_TAG:
		return Object.assign({}, state, {
			showTag: action.showTag
		});

		case Actions.ui.CHANGE_BGD:
		return Object.assign({}, state, {
			bgd: state.bgd.slice(1).concat( state.bgd.slice(0, 1) )
		});

		default:
		return state;
	}
};

var reducers = {
	blog: blogReducer,
	note: noteReducer,
	demo: demoReducer,
	msg: msgReducer,
	status: statusReducer,
	ui: uiReducer
};

export default reducers;