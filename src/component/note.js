
import React from 'react';
import Footer from './footer';

let Note = React.createClass({
	render() {
		let style = { backgroundColor: '#'+this.props.data.ui.bgd[3] };
		return (
			<div className="sec sec-note" style={ style }>
				<div className="contains">
					博文
				</div>
				
				<Footer></Footer>
			</div>
		);
	}
});

export default Note;