
export const action = {
	blog: {
		PAGE_TURN: 'PAGE_TURN',
		FILTER_TAG: 'FILTER_TAG',
		INIT_DATA: 'INIT_DATA'
	},
	note: {
		INIT_DATA: 'INIT_DATA',
		NEW_COMMENT: 'NEW_COMMENT'
	},
	demo: {
		INIT_DATA: 'INIT_DATA',
		PAGE_TURN: 'PAGE_TURN'
	},
	msg: {
		INIT_DATA: 'INIT_DATA',
		PAGE_TURN: 'PAGE_TURN'
	},
	status: {
		SHOW_INFO: 'SHOW_INFO',
		UPDATE_INFO: 'UPDATE_INFO',
		ERROR_SHOW: 'ERROR_SHOW',
		DIALOG_SHOW: 'DIALOG_SHOW'
	},
	ui: {
		SHOW_LOADING: 'SHOW_LOADING',
		SHOW_NAV: 'SHOW_NAV',
		SHOW_TAG: 'SHOW_TAG',
		CHANGE_BGD: 'CHANGE_BGD'
	}
};

export function blogPageTurn(data, len) {
	return {
		type: action.blog.PAGE_TURN,
		data: data,
		length: len
	};
}

export function blogFilterTag(cur, data, len) {
	return {
		type: action.blog.FILTER_TAG,
		data: data,
		length: len,
		current: cur
	};
}

export function blogInitData(category, list) {
	return {
		type: action.blog.INIT_DATA,
		category: category,
		list: list
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

export function demoPageTurn(len, data) {
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

export function msgPageTurn(data) {
	return {
		type: action.msg.PAGE_TURN,
		data: data
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

export function changeBgd() {
	return {
		type: action.ui.CHANGE_BGD
	};
}