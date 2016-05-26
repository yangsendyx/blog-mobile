
import React from 'react';

let Note = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[3] };
		return (
			<div className="sec sec-note" style={ style }>
				博文
			</div>
		);
	}
});

export default Note;