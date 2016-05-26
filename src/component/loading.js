
import React from 'react';

let Loading = React.createClass({
	render() {
		var show = this.props.ui.showLoading;
		var className = show ? 'loading show-middle' : 'loading';
		if( !show ) {
			setTimeout(() => {
				this.refs.loading.className = 'loading hide';
			}, 600);
		} else {
			setTimeout(() => {
				this.refs.loading.className = 'loading show';
			}, 10);
		}
		return (
			<div className={ className } ref="loading">
				<div className="circle">
					<div className="doc"></div>
				</div>
			</div>
		);
	}
});

export default Loading;