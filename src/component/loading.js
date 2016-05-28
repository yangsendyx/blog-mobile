
import React from 'react';
import option from '../option';

let Loading = React.createClass({
	getInitialState() {
		return { timeout: {}, timeoutFn: {} };
	},

	render() {
		let show = this.props.ui.showLoading;
		let className = show ? 'loading show-middle' : 'loading';
		if( !show ) {
			clearTimeout( this.state.timeout );
			clearTimeout( this.state.timeoutFn );
			this.state.timeout = setTimeout(() => {
				this.refs.loading.className = 'loading hide';
			}, option.hideAnimateTime-200);
		} else {
			clearTimeout( this.state.timeout );
			clearTimeout( this.state.timeoutFn );
			this.state.timeoutFn = setTimeout(() => {
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