
import React from 'react';
import { AjaxGet, timeFormat } from '../util.js';
import option from '../option';
import Footer from './footer';

let Demo = React.createClass({
	componentDidMount() {
		this.props.actions.demoInitData(0, []);
		let _this = this;
		let url = '/demo/list?start=0';
		setTimeout(() => {
			AjaxGet(url, this.props.actions, (data) => {
				_this.props.actions.demoInitData(data.length, data.data);
			});
		}, option.requestDelayTime);
	},

	addMore() {
		let _this = this;
		let data = this.props.data.demo;
		let url = '/demo/list?start='+(data.page * data.pageLen);
		AjaxGet(url, this.props.actions, (data) => {
			_this.props.actions.demoPageTurn(data.data);
		});
	},

	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[1] };
		let data = this.props.data.demo.data;
		let nextBtn = <div className="next-btn" onClick={ this.addMore }>加载更多</div>;

		return (
			<div className="sec sec-demo" style={ style }>
				<div className="contains">
					<div className="box">
						{
							data.map((el, i) => {
								return <Item key={ i } data={ el }></Item>;
							})
						}
					</div>

					{ this.props.data.demo.length == data.length ? '' : nextBtn }
				</div>
				
				<Footer></Footer>
			</div>
		);
	}
});

let Item = React.createClass({
	render() {
		return (
			<a href={ this.props.data.path } target="_blank">
				<div className="title">
					<div className="text">{ this.props.data.title }</div>
					<div className="time">{ this.props.data.time }</div>
				</div>
				<div className="img">
					<img src={ this.props.data.path + '/photo.jpg' } />
				</div>
				<div className="desc">{ this.props.data.desc }</div>
			</a>
		);
	}
});

export default Demo;