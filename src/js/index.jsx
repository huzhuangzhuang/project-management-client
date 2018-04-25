import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, Switch } from 'react-router';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Home from './home.jsx';
import Project from './project.jsx';
import Me from './me.jsx';
import EagleEye from './eagle-eye.jsx';
import Weekly from './weekly.jsx';
import Team from './team.jsx';

import {User, getUserInfo, Login} from './user.jsx';

import '../style/index.less';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='header'>
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/project">项目</Link></li>
            <li><Link to="/me">我的</Link></li>
            <li><Link to="/eagle-eye">鹰眼</Link></li>
            <li><Link to="/weekly">周报</Link></li>
            <li><Link to="/team">团队</Link></li>
            
          </ul>
        </div>
        <div className='container'>
          {this.props.children}
        </div>
        <Login />
      </div>);
  }
}


ReactDOM.render(
  (<HashRouter>
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/project" component={Project} />
        <Route path="/me" component={Me} />
        <Route path="/eagle-eye" component={EagleEye} />
        <Route path="/weekly" component={Weekly} />
        <Route path="/team" component={Team} />
    </App>
  </HashRouter>),
  document.body
);
