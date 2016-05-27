
import React from 'react';
import { AjaxGet } from '../util.js';
import Footer from './footer';

let Blog = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[0] };
		return (
			<div className="sec sec-blog" style={ style }>
				<div className="contains">
					博客
				</div>
				
				<Footer></Footer>
			</div>
		);
	}
});

export default Blog;