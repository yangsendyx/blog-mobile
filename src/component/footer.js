
import React from 'react';
import { Link } from 'react-router';

let Footer = React.createClass({
	render() {
		return (
			<div className="footer" id="footer">
				<div className="desc">
					<p className="footer-tagP">ys-Home是我学习成长的一个缩影，旨在记录自己在工作、生活以及学习中的点点滴滴。也希望能够借此认识更多志同道合的朋友，彼此共勉。</p>
				</div>
				<div className="nav">
					<Link to="/blog" onClick={ this.clickHandle }><span>博客</span></Link>
					<Link to="/demo" onClick={ this.clickHandle }><span>DEMO</span></Link>
					<Link to="/msg" onClick={ this.clickHandle }><span>留言</span></Link>
					<Link to="/about" onClick={ this.clickHandle }><span>关于我</span></Link>
				</div>
				<div className="line"></div>
				<div className="note">
					<p className="footer-tagP">Design & Code by 秀气小猪 , Base on Node.js + MongoDB</p>
					<p className="footer-tagP">粤ICP备14084840号   yshome.cc</p>
				</div>
			</div>
		);
	}
});

export default Footer;