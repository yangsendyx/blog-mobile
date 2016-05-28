
import React from 'react';
import { Link } from 'react-router';

let Nav = React.createClass({
	getInitialState() {
		return { is_click: true };
	},

	showTag() {
		this.props.actions.blogFilterShow( !this.props.blog.category.show );
	},

	showMenu() {
		this.props.actions.uiShowNav(true);
	},

	hideMenu() {
		this.props.actions.uiShowNav(false);
	},

	clickHandle(e) {
    	var _this = this;
    	if( !this.state.is_click ) {
    		e.preventDefault();
    	} else {
    		this.props.actions.uiShowNav(false);
    		this.state.is_click = false;
    		setTimeout(()=> {
    			_this.state.is_click = true;
    		}, 1000);
    	}
    },

	render() {
		let hash = window.location.hash;
		let className = /blog/.test(hash) && this.props.length ? 'iconfont icon-tag' : 'iconfont icon-tag hidden';
		let activeArr = ['' ,'', '', ''];
		let hashCon = window.location.hash.split('#/')[1].split('?')[0];

		if( !hashCon || hashCon == 'blog' || hashCon == 'note' ) {
			activeArr[0] = 'active';
		} else if( hashCon == 'demo' ) {
			activeArr[1] = 'active';
		} else if( hashCon == 'msg' ) {
			activeArr[2] = 'active';
		} else if( hashCon == 'about' ) {
			activeArr[3] = 'active';
		}

		return (
			<div className="sec-nav">
        		<div className={ className } onClick={ this.showTag }>&#xe600;</div>
        		<div className="iconfont icon-menu" onClick={ this.showMenu }>&#xe601;</div>

        		<ul className={ this.props.ui.showNav ? '' : 'hidden' }>
        			<li>
                		<Link to="/blog" onClick={ this.clickHandle } className={ activeArr[0] }>
                			<span className="iconfont">&#xe605;</span><span>博客</span>
                		</Link>
                	</li>
                	<li>
                		<Link to="/demo" onClick={ this.clickHandle } className={ activeArr[1] }>
                			<span className="iconfont">&#xe602;</span><span>实验DEMO</span>
                		</Link>
                	</li>
                	<li>
                		<Link to="/msg" onClick={ this.clickHandle } className={ activeArr[2] }>
                			<span className="iconfont">&#xe604;</span><span>留言</span>
                		</Link>
                	</li>
                	<li>
                		<Link to="/about" onClick={ this.clickHandle } className={ activeArr[3] }>
                			<span className="iconfont">&#xe606;</span><span>关于我</span>
                		</Link>
                	</li>
                	<li>
                		<a onClick={ this.hideMenu }>
                			<span className="iconfont">&#xe603;</span><span>关闭</span>
                		</a>
                	</li>
                </ul>
        	</div>
		);
	}
});

export default Nav;