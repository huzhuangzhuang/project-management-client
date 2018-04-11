import React from 'react';
import ajax from './utils.js';

var hasLogin = false;

export function getUserInfo(argument) {
	return new Promise(function(resolve, reject) {
		ajax().then(function(data) {
			resolve(hasLogin);
		}, reject);
	});
}

export class Login extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
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
  	hasLogin = true;
  	this.props.handler();
  }

	render() {
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


		return content;
	}
}

export default class User extends React.Component {
	render() {
		return (<div>user</div>);
	}
}