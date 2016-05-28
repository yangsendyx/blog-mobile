
import React from 'react';
import { AjaxGet, timeFormat, AjaxPost } from '../util.js';
import option from '../option';

import Footer from './footer';

let Msg = React.createClass({
	getInitialState() {
		return { id: '', to: '' };
	},

	componentDidMount() {
		this.props.actions.msgInitData(0, []);
		let _this = this;
		let url = '/message/list?start=0';
		setTimeout(() => {
			AjaxGet(url, this.props.actions, (data) => {
				_this.props.actions.msgInitData(data.length, data.msgs);
			});
		}, option.requestDelayTime);
	},

	pageTurn(page, active) {
		if( active ) return;
		let _this = this;
		let data = this.props.data.msg;
		let url = '/message/list?start='+((page-1) * data.pageLen);
		AjaxGet(url, this.props.actions, (data) => {
			_this.props.actions.msgPageTurn(data.msgs, page, data.length);
			_this.refs.wrap.scrollTop = 0;
		});
	},

	changeComment(fromName, fromId) {
		this.refs.wrap.scrollTop = '10000px';
		this.refs.input.focus();
		this.setState({ to: fromName, id: fromId });
	},

	cancelComment() {
		this.setState({ to: '', id: '' });
	},

	submitComment() {
		if( !this.props.data.status.info.name || !this.props.data.status.info.qq ) return this.props.actions.statusShowInfo( true );
		let node = this.refs.input;
		let val = node.value;
		if( !val ) return this.props.actions.statusDialogShow(true, '亲，先写点东西再提交吧。^_^');
		let data = {
			from: this.props.data.status.info.name,
			msg: val,
			qq: this.props.data.status.info.qq
		};
		if( this.state.id ) {
			data.id = this.state.id;
			data.to = this.state.to;	
		}

		let url = '/message/save';
		let _this = this;
		AjaxPost(url, data, this.props.actions, (_data) => {
			if( _this.state.id ){
				_this.pageTurn(_this.props.data.msg.page, false);
			} else {
				_this.pageTurn(1, false);
			}
			node.value = '';
			this.setState({ to: '', id: '' });
		});
	},

	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[2] };
		let msg = this.props.data.msg;
		let data = msg.data;
		let all = Math.ceil(msg.length / msg.pageLen);
		let pagingData = makePaging( all, msg.page );
		
		return (
			<div className="sec sec-msg" style={ style } ref="wrap">
				<div className="contains">
					<div className="comment-box">
						{
							data.map((el, i) => {
								return <Item key={ i } data={ el } comment={ this.changeComment }></Item>;
							})
						}
					</div>
					<div className="page-btn-wrap">
						{
							pagingData.map((el, i) => {
								return <PageBtn key={ i } data={ el } pageFn={ this.pageTurn }></PageBtn>;
							})
						}
					</div>
					{
						data.length ? (<div className="comment-input">
						<textarea ref="input"></textarea>
						<div className="btn-wrap">
							{ this.state.id ? <span className="comment-text">回复 { this.state.to }</span> : '' }
							<span className="button" onClick={ this.submitComment }>提交</span>
							{ this.state.id ? <span className="button" onClick={ this.cancelComment }>取消回复</span> : '' }
						</div>
					</div>) : ''
					}
				</div>
					
				<Footer></Footer>
			</div>
		);
	}
});

let PageBtn = React.createClass({
	render() {
		var className = this.props.data.active ? 'active': '';
		var page = this.props.data.page;
		return <span className={ className } onClick={ ()=>this.props.pageFn(page, this.props.data.active) }>{ page }</span>;
	}
});

let Item = React.createClass({
	render() {
		let data = this.props.data;
		return (
			<div>
				<div className="img">
					<img src={ data.qq?"http://q4.qlogo.cn/g?b=qq&nk="+data.qq+"&s=3":"/img/default.jpg" }/>
				</div>
				<div className="info-wrap">
					<div className="title">
						<span className="name">{ data.from }</span>
						<span className="time">[{ timeFormat(data.time, 'YY/MM/DD HH:mm') }]</span>
						<span className="comment" onClick={ ()=>this.props.comment(data.from, data.id) }>回复</span>
					</div>
					<div className="body">{ data.msg }</div>
				</div>
				{
					data.reply.map((el, i) => {
						return <Reply key={ i } data={ el } comment={ this.props.comment } id={ data.id }></Reply>;
					})
				}
			</div>
		);
	}
});

let Reply = React.createClass({
	render() {
		let data = this.props.data;
		return (
			<div className="reply">
				<span className="triangle"></span>
				<div className="img">
					<img src={ data.qq?"http://q4.qlogo.cn/g?b=qq&nk="+data.qq+"&s=3":"/img/default.jpg" }/>
				</div>
				<div className="info-wrap">
					<div className="title">
						<span className="name">{ data.from } 回复 { data.to }</span>
						<span className="time">[{ timeFormat(data.time, 'YY/MM/DD HH:mm') }]</span>
						<span className="comment" onClick={ ()=>this.props.comment(data.from, this.props.id) }>回复</span>
					</div>
					<div className="body">{ data.msg }</div>
				</div>
			</div>
		);
	}
});

let makePaging = (all, current) => {
	var arr = [];
	var loop = function(min, max) {
		for( var i=min; i<max; i++ ) {
			var json, active = false;
			if( (i+1) == current ) active = true;
			json = { text: (i+1), page: (i+1), active: active };
			arr.push( json );
		}
	};

	if( all <= 5 ) {
		loop( 0, all );
	} else {
		if( current != 1 ) {
			arr.push({ text: '首页', page: 1, active: false });
			arr.push({ text: '上一页', page: (current-1), active: false });
		}

		if( current < 3 ) {
			loop( 0, 5 );
		} else if( current > all-2 ) {
			loop( all-5, all );
		} else {
			arr.push({ text: (current-2), page: (current-2), active: false });
			arr.push({ text: (current-1), page: (current-1), active: false });
			arr.push({ text: current, page: current, active: true });
			arr.push({ text: (current+1), page: (current+1), active: false });
			arr.push({ text: (current+2), page: (current+2), active: false });
		}

		if( current != all ) {
			arr.push({ text: '下一页', page: (current+1), active: false });
			arr.push({ text: '尾页', page: all, active: false });
		}
	}
	return arr;
};

export default Msg;