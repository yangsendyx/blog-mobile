
import React from 'react';
import option from '../option';

let Dialog = React.createClass({
	getInitialState() {
		return { timeoutFn: {} };
	},
	
	render() {
		let show = this.props.status.dialog.show;
		let className = show ? 'dialog show-middle' : 'dialog';
		if( !show ) {
			setTimeout(() => {
				this.refs.dialog.className = 'dialog hide';
			}, option.hideAnimateTime);
		} else {
			setTimeout(() => {
				this.refs.dialog.className = 'dialog show';
			}, 10);
			clearTimeout( this.state.timeoutFn );
			this.state.timeoutFn = setTimeout(() => {
				this.props.actions.statusDialogShow( false );
			}, option.hideCallBackTime);
		}

		return (
			<div className={ className } ref="dialog">
				<p>{ this.props.status.dialog.msg }&nbsp;</p>
			</div>
		);
	}
});

export default Dialog;