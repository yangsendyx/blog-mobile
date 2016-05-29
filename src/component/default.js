
import React from 'react';

let Default = React.createClass({
	getInitialState() {
		return { timeoutFn: {} };
	},

	componentDidMount() {
		let span = this.refs.wel.children;
		span[0].className = 'welcome-span-0';
		span[1].className = 'welcome-span-1';
		span[2].className = 'welcome-span-2';
		span[3].className = 'welcome-span-3';
		span[4].className = 'welcome-span-4';
		span[5].className = 'welcome-span-5';
		span[6].className = 'welcome-span-6';
	},

	render() {
		let isHide = this.props.ui.showFirst ? false : true;
		let className = isHide ? 'sec-default hide' : 'sec-default';

		let _this = this;
		if( !this.props.ui.showFirst ) {
			clearTimeout( this.state.timeoutFn );
			this.state.timeoutFn = setTimeout(() => {
				console.log('a');
				_this.refs.wrap.className = 'sec-default real-hide';
			}, 400);
		}

		return (
			<div className={ className } ref="wrap">
				<div className="welcome move" ref="wel">
					<i>W</i>
					<i>E</i>
					<i>L</i>
					<i>C</i>
					<i>O</i>
					<i>M</i>
					<i>E</i>
				</div>
			</div>
		);
	}
});

export default Default;