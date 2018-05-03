import React from 'react';

export class Loading extends React.Component {
  render() {
  	if (this.props.loading) {
  		return (<div>
  			loading...
  		</div>);
  	}
  	return (<div></div>);
  }
}

export function postMsg(msg, type) {
	window.postMessage({
		eventType: 'msg',
		data: {
			msg: msg,
			type: type
		}
	}, '*');
}

export function ajax(options) {
	return new Promise(function(resolve, reject) {
		var msg = '';
		if (typeof options === 'string') {
			options = {
				url: options,
				method: 'get',
				data: null
			}
		}

		if (typeof options === 'object') {
			try {
				var xhr = new XMLHttpRequest();
				xhr.open(options.method, options.url);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var result = JSON.parse(xhr.responseText);
							if (result.success) {
								resolve(result.data);
							} else {
								switch(result.error.code) {
									case 401:
										window.dispathEvent(new Event('checkUser'));
										break;
									default:;
								}

								reject(result.error.msg);
							}
						} else {
							reject('请求失败！');
						}
					}
				};
				xhr.send(options.data ? JSON.stringify(options.data) : null);

			} catch(e) {
				console.error(e);
				reject(e);
			}
			
		} else {
			msg = '请求参数格式错误！';
			console.error(msg);
			reject(msg);
		}
	});
}

export default class Msg extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	show: props.msg ? true : false,
    	type: props.type || 'default',
    	msg: props.msg || ''
    };

    this.updateMsg = this.updateMsg.bind(this);
    this.hideTimer = null;
  }
  updateMsg(e) {
  	var data = e.data;
  	if (data.eventType !== 'msg') {
  		return;
  	}
  	var type = data.data.type;
  	var msg = data.data.msg;
  	if (['error', 'success', 'warn', 'default'].indexOf(type) === -1) {
  		type = 'default';
  	}

  	if (this.hideTimer) {
  		clearTimeout(this.hideTimer);
  		this.hideTimer = null;
  	}

  	this.setState({
  		msg: msg,
  		type: type,
  		show: true
  	});

  	this.hideTimer = setTimeout(() => {
  		this.setState({
  			show: false
  		});
  	}, 2000);
  }
  componentDidMount() {
  	window.addEventListener('message', this.updateMsg);
  }
  componentWillUnmount() {
  	window.removeEventListener('message', this.updateMsg);
  }
  render() {
  	return (<div className={['msg', 'msg_' + this.state.type, this.state.show ? '' : 'hidden'].join(' ')}>
  		<p>{this.state.msg}</p>
  	</div>);
  }
}