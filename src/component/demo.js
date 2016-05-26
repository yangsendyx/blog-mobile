
import React from 'react';

let Demo = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[1] };
		return (
			<div className="sec sec-demo" style={ style }>
				Demo
			</div>
		);
	}
});

export default Demo;