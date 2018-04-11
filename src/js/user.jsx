import React from 'react';
import ajax from './utils.js';

export function getUserInfo(argument) {
	return new Promise(function(resolve, reject) {
		ajax().then(function(data) {
			resolve(null);
		}, reject);
	});
}

export class Login extends React.Component {
	render() {
		return (<div>user</div>);
	}
}

export default class User extends React.Component {
	render() {
		return (<div>user</div>);
	}
}