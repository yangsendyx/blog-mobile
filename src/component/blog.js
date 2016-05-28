
import React from 'react';
import { AjaxGet, timeFormat } from '../util.js';
import { Link } from 'react-router';
import option from '../option';
import Footer from './footer';

let Blog = React.createClass({
	componentDidMount() {
		let _this = this;
		let url = '';
		let data = {};
		let count = 0;
		let initFn = () => {
			count++;
			if( count != 2 ) return;
			this.props.actions.blogInitData( data.categoryData, data.listData, data.listLen );
		};
		setTimeout(() => {
			url = '/article/category';
			AjaxGet(url, this.props.actions, (_data) => {
				let allLen = 0;
				_data.data.forEach((el) => {
					allLen += el.length;
					el.active = false;
				});
				_data.data.unshift({ _id: 'all', name: '全部', length: allLen, active: true });
				data.categoryData = _data.data;
				initFn();
			});
			url = '/article/list?start=0&type=all';
			AjaxGet(url, this.props.actions, (_data) => {
				data.listData = _data.data;
				data.listLen = _data.length;
				initFn();
			});
		}, option.requestDelayTime);
	},

	addMore() {
		let _this = this;
		let data = this.props.data.blog;
		let url = '/article/list?type='+data.category.type+'&start='+(data.list.page * data.list.pageLen);
		AjaxGet(url, this.props.actions, (_data) => {
			_this.props.actions.blogPageTurn(_data.data, _data.length);
		});
	},

	changeFilter(id) {
		let _this = this;
		let url = '/article/list?start=0&type='+id;
		AjaxGet(url, this.props.actions, (_data) => {
			_this.props.actions.blogFilterTag( id, _data.data, _data.length );
			this.refs.wrap.scrollTop = 0;
		});
	},

	closeFilter() {
		this.props.actions.blogFilterShow( false );
	},

	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[0] };
		let data = this.props.data.blog;
		let tags = data.category.data;
		let filterClass = data.category.show ? 'filter-tag' : 'filter-tag hide';
		let list = data.list.data;
		let nextBtn = <div className="next-btn" onClick={ this.addMore }>加载更多</div>;
		
		return (
			<div className="sec sec-blog" style={ style } ref="wrap">
				<div className="contains">
					<div className={ filterClass } ref="filter">
						{
							tags.map((el, i) => {
								return <Tag key={i} data={el} change={ this.changeFilter }></Tag>;
							})
						}
						<div className="close" onClick={ this.closeFilter }>关闭</div>
					</div>
					<div className="blog-list">
						{
							list.map((el, i) => {
								return <Article key={i} data={el}></Article>;
							})
						}

						{ list.length == data.list.length ? '' : nextBtn }
					</div>
				</div>
				
				<Footer></Footer>
			</div>
		);
	}
});

let Tag = React.createClass({
	render() {
		let className = this.props.data.active ? 'tag-item active' : 'tag-item';
		return (
			<div className={ className } onClick={ () => this.props.change(this.props.data._id) }>
				{ this.props.data.name } <span>[{ this.props.data.length }]</span>
			</div>
		);
	}
});

let Article = React.createClass({
	render() {
		let url = '/blog/'+this.props.data._id;
		return (
			<div className="box-wrap">
				<Link to={ url }>
	    			<div className="title">{ this.props.data.title }</div>
	    			<div className="body">{ this.props.data.desc }</div>
	    			<div className="footer">
	    				<div className="type">{ this.props.data.type }</div>
	    				<div className="time">{ timeFormat(this.props.data.meta.createAt, 'YYYY-MM-DD HH:mm:ss') }</div>
	    			</div>
	    		</Link>
	    	</div>
		);
	}
});

export default Blog;