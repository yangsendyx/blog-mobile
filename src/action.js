
export const action = {
	blog: {
		PAGE_TURN: 'BLOG_PAGE_TURN',
		FILTER_TAG: 'BLOG_FILTER_TAG',
		INIT_DATA: 'BLOG_INIT_DATA',
		FILTER_SHOW: 'BLOG_FILTER_SHOW'
	},
	note: {
		INIT_DATA: 'NOTE_INIT_DATA',
		NEW_COMMENT: 'NOTE_NEW_COMMENT'
	},
	demo: {
		INIT_DATA: 'DEMO_INIT_DATA',
		PAGE_TURN: 'DEMO_PAGE_TURN'
	},
	msg: {
		INIT_DATA: 'MSG_INIT_DATA',
		PAGE_TURN: 'MSG_PAGE_TURN'
	},
	status: {
		SHOW_INFO: 'STATUS_SHOW_INFO',
		UPDATE_INFO: 'STATUS_UPDATE_INFO',
		ERROR_SHOW: 'STATUS_ERROR_SHOW',
		DIALOG_SHOW: 'STATUS_DIALOG_SHOW'
	},
	ui: {
		SHOW_LOADING: 'UI_SHOW_LOADING',
		SHOW_NAV: 'UI_SHOW_NAV',
		SHOW_TAG: 'UI_SHOW_TAG',
		SHOW_FIRST: 'UI_SHOW_FIRST',
		CHANGE_BGD: 'UI_CHANGE_BGD'
	}
};

export function blogPageTurn(listData, listLen) {
	return {
		type: action.blog.PAGE_TURN,
		listData: listData,
		listLen: listLen
	};
}

export function blogFilterTag(choiceId, listData, listLen) {
	return {
		type: action.blog.FILTER_TAG,
		choiceId: choiceId,
		listData: listData,
		listLen: listLen
	};
}

export function blogFilterShow(state) {
	return {
		type: action.blog.FILTER_SHOW,
		show: state
	};
}

export function blogInitData(categoryData, listData, listLen) {
	return {
		type: action.blog.INIT_DATA,
		categoryData: categoryData,
		listData: listData,
		listLen: listLen
	};
}

export function noteInitData(comment, article) {
	return {
		type: action.note.INIT_DATA,
		comment: comment,
		article: article
	};
}

export function noteNewComment(comment) {
	return {
		type: action.note.NEW_COMMENT,
		comment: comment
	};
}

export function demoInitData(len, data) {
	return {
		type: action.demo.INIT_DATA,
		length: len,
		data: data
	};
}

export function demoPageTurn(data) {
	return {
		type: action.demo.PAGE_TURN,
		data: data
	};
}

export function msgInitData(len, data) {
	return {
		type: action.msg.INIT_DATA,
		data: data,
		length: len
	};
}

export function msgPageTurn(data, page, length) {
	return {
		type: action.msg.PAGE_TURN,
		data: data,
		page: page,
		length: length
	};
}

export function statusShowInfo(state) {
	return {
		type: action.status.SHOW_INFO,
		show: state
	};
}

export function statusUpdateInfo(name, qq) {
	return {
		type: action.status.UPDATE_INFO,
		name: name,
		qq: qq
	};
}

export function statusErrorShow(show, msg) {
	return {
		type: action.status.ERROR_SHOW,
		show: show,
		msg: msg ? msg : ''
	};
}

export function statusDialogShow(state, msg) {
	return {
		type: action.status.DIALOG_SHOW,
		show: state,
		msg: msg ? msg : ''
	};
}

export function uiShowLoading(state) {
	return {
		type: action.ui.SHOW_LOADING,
		showLoading: state
	};
}

export function uiShowNav(state) {
	return {
		type: action.ui.SHOW_NAV,
		showNav: state
	};
}

export function uiShowTag(state) {
	return {
		type: action.ui.SHOW_TAG,
		showTag: state
	};
}

export function uiShowFirst(state) {
	return {
		type: action.ui.SHOW_FIRST,
		showFirst: state
	};
}

export function changeBgd() {
	return {
		type: action.ui.CHANGE_BGD
	};
}