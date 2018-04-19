import React from 'react';
import Loading from './utils.jsx';

export default class Team extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	members: [],
    	noTeam: false,
    	loading: true
    };
  }

  componentDidMount() {
  	setTimeout(() => {
  		this.setState({
	  		name: 'Test Team Name',
	  		members: [{
	  			name: 'Allen'
	  		},{
	  			name: 'Bob'
	  		},{
	  			name: 'Charles'
	  		},{
	  			name: 'David'
	  		},{
	  			name: 'Eva'
	  		}],
	  		loading: false
	  	});
  	});
  }

  render(){

  	var list = this.state.members.map((member) => {
  		return (<li>{member.name}</li>);
  	});

  	var noTeam = (<div>没有团队</div>);

    return (
      <div className='page'>
      	<h1>{this.state.name}</h1>
      	<ul>
      	{list}
      	</ul>
      </div>
    );
  }
}