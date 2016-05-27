
import React from 'react';
import Footer from './footer';
var imgSrc = require('../img/touxiang.jpg');

let About = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[4] };
		setTimeout(() => {
			this.refs.p1.className = 'show';
			this.refs.p2.className = 'show';
			this.refs.p3.className = 'show';
		}, 10);

		return (
			<div className="sec sec-about" style={ style }>
				<div className="contains">
					<div className="img">
						<img src={ imgSrc }/>
					</div>
					<p className="text-desc">90后天蝎男，web前端攻城狮，js全栈开发者</p>
					<div className="icon">
						<div className="hrefWrap">
							<a href="https://github.com/yangsendyx" target="_blank">
								<span className="iconfont">&#xe609;</span>
							</a>
						</div>
						<div className="hrefWrap">
							<a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=MUhQX1ZCVF9VSElxQEAfUl5c" target="_blank">
								<span className="iconfont">&#xe608;</span>
							</a>
						</div>
						<div className="hrefWrap">
							<a href="mqq://im/chat?chat_type=wpa&uin=405287342&version=1&src_type=web" target="_blank">
								<span className="iconfont">&#xe607;</span>
							</a>
						</div>
					</div>
					<div className="summary">
						<p ref="p1" className="text-desc">前端基于<a href="https://angularjs.org/" target="_blank">Angular.js</a> (PC端) 及<a href="https://facebook.github.io/react/" target="_blank">React.js</a> (移动端) 实现</p>
						<p ref="p2" className="text-desc">后台则由<a href="https://nodejs.org/" target="_blank">Node.js</a> + <a href="http://expressjs.com/" target="_blank">Express</a>框架搭建，数据库为<a href="https://www.mongodb.org/" target="_blank">MongoDB</a></p>
						<p ref="p3" className="text-desc">
							<a href="https://github.com/yangsendyx/blog" target="_blank">后端+PC端源码</a>
							<a href="https://github.com/yangsendyx/blog-mobile" target="_blank">移动端源码</a>
						</p>
					</div>
				</div>
				
				<Footer></Footer>
			</div>
		);
	}
});

export default About;