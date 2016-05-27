
import React from 'react';
import { AjaxGet } from '../util.js';

let Blog = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[0] };
		return (
			<div className="sec sec-blog" style={ style }>
				博客
			</div>
		);
	}
});

export default Blog;