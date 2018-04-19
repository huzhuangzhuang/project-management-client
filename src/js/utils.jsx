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

export class Msg extends React.Component {
  render() {
  	if (this.props.msg) {
  		return (<div className={'msg_' + this.props.msg.type}>
  			{this.props.msg.content}
  		</div>);
  	}
  	return (<div></div>);
  }
}

export default function ajax(options) {
	return new Promise(function(resolve, reject) {
		resolve(true);
	});
}