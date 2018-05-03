import React from 'react';
import {ajax} from './utils.jsx';

export function getUserInfo() {
	return new Promise(function(resolve, reject) {
		ajax('/getUserInfo').then(function(data) {
			resolve(true);
		}, function(e) {
			reject(e);
		});
		// resolve(true);
	});
}

export class Login extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	show: false,
    	mode: 'login',
    	username: '',
    	password: '',
    	email: ''
    };

    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUserNameChange(e) {
  	this.setState({
  		username: e.target.value
  	});
  }

  onPasswordChange(e) {
  	this.setState({
  		password: e.target.value
  	});
  }

  toggle(e) {
  	e.preventDefault();
  	var mode = this.state.mode;
  	if (mode === 'login') {
  		mode = 'register';
  	} else {
  		mode = 'login';
  	}

  	this.setState({
  		mode: mode
  	});
  }

  onSubmit() {
  }

  componentDidMount() {
  	var me = this;
  	function doCheckUser() {
  		getUserInfo().then((userInfo) => {
  			if (userInfo) {
  				me.setState({
  					show: false
  				});
  			} else {
  				me.setState({
  					show: true
  				});
  			}
  		}, () => {
  			me.setState({
					show: true
				});
  		});
  	}

  	doCheckUser();

  	window.addEventListener('checkUser', doCheckUser);
  }

	render() {
		if (!this.state.show) {
			return null;
		}

		var content = null;

		if (this.state.mode === 'login') {
			content = (
				<div className='login-container'>
					<h1>登录</h1>
					<p><label>用户名</label><input value={this.state.username} onChange={this.onUserNameChange} /></p>
					<p><label>密码</label><input value={this.state.password} onChange={this.onPasswordChange} /></p>
					<p><button onClick={this.onSubmit}>登录</button></p>
					<p><a onClick={this.toggle}>注册</a></p>
				</div>
			);
		} else {
			content = (
				<div className='login-container'>
					<h1>注册</h1>
					<p><label>用户名</label><input value={this.state.username} onChange={this.onUserNameChange} /></p>
					<p><label>密码</label><input value={this.state.password} onChange={this.onPasswordChange} /></p>
					<p><button onClick={this.onSubmit}>注册</button></p>
					<p><a onClick={this.toggle}>登录</a></p>
				</div>
			);
		}


		return (<div className='login-mask'>{content}</div>);
	}
}

export default class User extends React.Component {
	render() {
		return (<div>user</div>);
	}
}