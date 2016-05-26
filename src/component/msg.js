
import React from 'react';

let Msg = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[2] };
		return (
			<div className="sec sec-msg" style={ style }>
				留言
			</div>
		);
	}
});

export default Msg;