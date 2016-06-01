
import React from 'react';
import { AjaxGet, timeFormat, AjaxPost } from '../util.js';
import option from '../option';
import Footer from './footer';

let Note = React.createClass({
	getInitialState() {
		return { id: '', to: '', _id: '' };
	},

	componentWillMount() {
		this.props.actions.noteInitData( [], [] );
	},

	componentDidMount() {
		let id = window.location.hash.split('/blog/')[1].split('?')[0];
		this.state._id = id;
		let data = {};
		let url = '';
		let count = 0;
		let initFn = () => {
			count++;
			if( count != 2 ) return;
			this.props.actions.noteInitData( data.comment, [data.article] );
		};
		setTimeout(() => {
			url = '/article/comment/'+id;
			AjaxGet(url, this.props.actions, (_data) => {
				data.comment = _data.data;
				initFn();
			});
			url = '/article/'+id;
			AjaxGet(url, this.props.actions, (_data) => {
				data.article = _data.data;
				initFn();
			});
		}, option.requestDelayTime);
	},

	changeComment(fromName, fromId) {
		this.refs.input.focus();
		this.setState({ to: fromName, id: fromId, _id: this.state._id });
	},

	cancelComment() {
		this.setState({ to: '', id: '', _id: this.state._id });
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

		let url = '/article/comment/save/'+this.state._id;
		let _this = this;
		AjaxPost(url, data, this.props.actions, (_data) => {
			_this.refreshComment();
			node.value = '';
			this.setState({ to: '', id: '', _id: this.state._id });
		});
	},

	refreshComment() {
		let url = '/article/comment/'+this.state._id;
		let _this = this;
		AjaxGet(url, this.props.actions, (_data) => {
			_this.props.actions.noteNewComment( _data.data );
		});
	},

	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[3] };
		let article = this.props.data.note.article;
		let comment = this.props.data.note.comment;
		let isHide = article.length ? false : true;
		
		return (
			<div className="sec sec-note" style={ style }>
				{
					isHide ? '' : <div className="contains">
						{
							article.map((el, i) => {
								return <ArticleItem key={i} data={el}></ArticleItem>;
							})
						}
						<div className="comment-input">
							<textarea ref="input"></textarea>
							<div className="btn-wrap">
								{ this.state.id ? <span className="comment-text">回复 { this.state.to }</span> : '' }
								<span className="button" onClick={ this.submitComment }>提交</span>
								{ this.state.id ? <span className="button" onClick={ this.cancelComment }>取消回复</span> : '' }
							</div>
						</div>
						<div className="comment-box">
							{
								comment.map((el, i) => {
									return <Item key={ i } data={ el } comment={ this.changeComment }></Item>;
								})
							}
						</div>
					</div>
				}
				{ isHide ? '' : <Footer></Footer> }
			</div>
		);
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
						<span className="comment" onClick={ ()=>this.props.comment(data.from, data._id) }>回复</span>
					</div>
					<div className="body">{ data.msg }</div>
				</div>
				{
					data.reply.map((el, i) => {
						return <Reply key={ i } data={ el } comment={ this.props.comment } id={ data._id }></Reply>;
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

let ArticleItem = React.createClass({
	render() {
		let data = this.props.data;
		return (
			<div className="article">
				<div className="title">
					<h1>{ data.title }</h1>
					<p>分类：{ data.category.name }</p>
					<p>更新时间：{ timeFormat(data.meta.createAt, 'YYYY-MM-DD HH:mm:ss') }</p>
				</div>
				<div className="body" dangerouslySetInnerHTML={{ __html: data.article }}></div>
			</div>
		);
	}
});

export default Note;