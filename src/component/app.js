
import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as todoAction from '../action';

import Nav from './nav';
import Footer from './footer';
import Loading from './loading';
import Err from './error';
import Info from './info';
import Dialog from './dialog';
import Default from './default';
require('../less/main.less');
require('../font/iconfont.css');

let App = React.createClass ({
	getInitialState() {
		return { actions: {} };
	},

	componentDidMount() {
		setInterval(() => {
			this.state.actions.changeBgd();
		}, 30000);
	},

  	render() {
  		const { dispatch, blog, demo, msg, note, status, ui } = this.props;
  		const data = { blog:blog, demo: demo, note: note, msg: msg, status: status, ui: ui };
		const actions = bindActionCreators(todoAction, dispatch);
		this.state.actions = actions;

        return (
            <div>
            	<Nav actions={ actions } ui={ ui } length={ blog.category.data.length } ></Nav>
            	<Loading ui={ ui }></Loading>
            	<Err status={ status } actions={ actions }></Err>
            	<Info status={ status } actions={ actions }></Info>
            	<Dialog status={ status } actions={ actions }></Dialog>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="example"
                    transitionEnterTimeout={ 1000 }
                    transitionLeaveTimeout={ 1000 } >
                    {
                    	React.cloneElement(this.props.children, {
	                        key: this.props.location.pathname,
	                        actions: actions,
	                        data: data
	                    })
                    }
                </ReactCSSTransitionGroup>
                <Footer></Footer>
            </div>
        );
    }
});

let select = (state) => {
	return {
		blog: state.blog,
		note: state.note,
		demo: state.demo,
		msg: state.msg,
		status: state.status,
		ui: state.ui
	};
};

export default connect(select)(App);