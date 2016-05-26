
import React from 'react';

let Info = React.createClass({
	/*componentDidMount() {
		setTimeout(() => {
			this.props.actions.statusShowInfo( true );
		}, 2000);
	},*/

	sureInfo() {
		var name = this.refs.name.value;
		var qq = this.refs.qq.value;
		if( !name ) return this.props.actions.statusDialogShow( true, '亲，至少输入下昵称呗。(^з^)' );
		if( !qq ) return this.props.actions.statusDialogShow( true, '亲，要不再输入下QQ？→_→' );
		var json = { name: name, qq: qq };
		localStorage.setItem('info', JSON.stringify( json ) );
		this.props.actions.statusUpdateInfo(name, qq);
	},

	cancelInfo() {
		this.props.actions.statusShowInfo( false );
	},

	render() {
		let className = this.props.status.info.show ? 'info show' : 'info';
		return (
			<div className={ className }>
				<div className="input-wrap">
					<input type="text" className="input" ref="name" placeholder="请输入昵称"/>
				</div>
				<div className="input-wrap">
					<input type="number" className="input" ref="qq" placeholder="请输入QQ号码"/>
				</div>
				<p>QQ号码仅用作获取头像方便交流之用</p>
				<div className="button-wrap">
					<button onClick={ this.sureInfo }>确认</button>
					<button onClick={ this.cancelInfo }>取消</button>
				</div>
			</div>
		);
	}
});

export default Info;