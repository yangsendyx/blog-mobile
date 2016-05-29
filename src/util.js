

let successFn = (json, actions, cb) => {
	loadingCtrl.hide(actions, () => {
		if( json.type == 'ok' ) return cb( json );
		if( /read/.test(json.info) ) {
			actions.statusErrorShow(true, '服务器读取数据失败');
		} else if( /save/.test(json.info) ) {
			actions.statusErrorShow(true, '服务器存储数据失败');
		} else {
			actions.statusErrorShow(true, json.info);
		}
	});
};

let errorFn = (ex, actions) => {
	loadingCtrl.hide(actions, (ex) => {
		actions.statusErrorShow(true, '通信失败');
		console.log( ex );
	});
};

class LoadingTimeCtrl {
	show(actions) {
		this.showTime = Date.now();
		actions.uiShowLoading( true );
	}

	hide(actions, cb) {
		let diff = Date.now() - this.showTime;
		if( diff < 400 ) {
			diff = 400 - diff;
		}
		
		this.timeoutFn = setTimeout(() => {
			cb();
			actions.uiShowLoading( false );
		}, diff);
	}
}
let loadingCtrl = new LoadingTimeCtrl;

export function AjaxGet(url, actions, cb) {
	loadingCtrl.show( actions );
	fetch( url )
	.then(function(response) {
		if( !response.ok ) actions.statusErrorShow(true, response.statusText);
		return response.json();
	}).then(function(json) {
		successFn(json, actions, cb);
	}).catch(function(ex) {
		errorFn(ex, actions);
	});
}

export function AjaxPost(url, data, actions, cb) {
	loadingCtrl.show( actions );
	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(function(response) {
		if( !response.ok ) actions.statusErrorShow(true, response.statusText);
		return response.json();
	}).then(function(json) {
		successFn(json, actions, cb);
	}).catch(function(ex) {
		errorFn(ex, actions);
	});
}

let addZero = (num) => {
	return num < 10 ? '0' + num : '' + num;
};

export function timeFormat(time, format) {
	let dateObj, json = {};
	if (!time) {
		dateObj = new Date();
	} else if( typeof time == 'object' ) {
		dateObj = time;
	} else if( typeof time == 'number' ) {
		dateObj = new Date( time );
	} else if( typeof time == 'string' && time.length == 13 ) {
		dateObj = new Date( parseInt(time) );
	} else if( typeof time == 'string' ) {
		try {
			dateObj = new Date( time );
		} catch(err) {
			console.trace( new Error('Can not resolve time.') );
			return { err: true };
		}
	} else {
		console.trace( new Error('Can not resolve time.') );
		return { err: true };
	}
	
	json.Y = dateObj.getFullYear();
	json.M = addZero(dateObj.getMonth() + 1);
	json.D = addZero(dateObj.getDate());
	json.H = addZero(dateObj.getHours());
	json.m = addZero(dateObj.getMinutes());
	json.s = addZero(dateObj.getSeconds());
	json.dateObj = dateObj;
	if( format == 'YYYY-MM-DD HH:mm:ss' ) {
		return json.Y+'-'+json.M+'-'+json.D+' '+json.H+':'+json.m+':'+json.s;
	} else if( format == 'YYYY-MM-DD' ) {
		return json.Y+'-'+json.M+'-'+json.D;
	} else if( format == 'YYYY-MM-DD HH:mm' ) {
		return json.Y+'-'+json.M+'-'+json.D+' '+json.H+':'+json.m;
	} else if(format == 'YY/MM/DD HH:mm') {
		return (json.Y+'').substr(2)+'/'+json.M+'/'+json.D+' '+json.H+':'+json.m;
	}
	return json;
}