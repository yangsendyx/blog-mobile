
import React from 'react';
import ReactDOM from 'react-dom';
import option from '../option';

let Err = React.createClass({
	getInitialState() {
		return { timeoutFn: {}, timeoutFn2: {} };
	},

	render() {
		var show = this.props.status.error.show;
		let className = show ? 'error show-middle' : 'error';
		
		if( !show ) {
			clearTimeout( this.state.timeoutFn2 );
			this.state.timeoutFn2 = setTimeout(() => {
				this.refs.error.className = 'error hide';
			}, option.hideAnimateTime);
		} else {
			setTimeout(() => {
				this.refs.error.className = 'error show';
			}, 10);
			clearTimeout( this.state.timeoutFn );
			clearTimeout( this.state.timeoutFn2 );
			this.state.timeoutFn = setTimeout(() => {
				this.props.actions.statusErrorShow( false );
			}, option.hideCallBackTime);
		}

		return (
			<div className={ className } ref="error">
				<p>啊咧~~ 貌似发生错误了。ಥ_ಥ </p>
				<p>请稍后再试一下吧。Ծ‸Ծ</p>
				<p>错误：{ this.props.status.error.msg }</p>
			</div>
		);
	}
});

export default Err;