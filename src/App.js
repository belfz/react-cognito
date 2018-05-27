import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Bucket from './Bucket';
import UserInfo from './UserInfo';
import ProtectedRoute from './ProtectedRoute';
import AuthContext from './AuthContext';
import './App.css';

class App extends Component {
  constructor () {
    super();

    this.state = {
      isLoggedIn: false,
      user: null
    };
  }

  onLoggedIn (user) {
    this.setState({ isLoggedIn: true, user });
  }

  logOut () {
    Auth.signOut();
    this.setState({ isLoggedIn: false, user: null });
  }

  componentDidMount () {
    Auth.currentAuthenticatedUser()
      .then(this.onLoggedIn.bind(this))
      .catch(err => console.log(err));
  }

  render () {
    return (
      <Router>
        <AuthContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, user: this.state.user, onLoggedIn: this.onLoggedIn.bind(this) }}>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/bucket">bucket</Link></li>
            <li><Link to="/user-info">user info</Link></li>
            { this.state.isLoggedIn && <li onClick={this.logOut.bind(this)}>log out</li> }
          </ul>
          <Switch>
            <ProtectedRoute exact path="/">
              <Redirect to={{ pathname: '/bucket' }} />
            </ProtectedRoute>
            <ProtectedRoute path="/bucket">
              <Bucket />
            </ProtectedRoute>
            <ProtectedRoute path="/user-info">
              <UserInfo />
            </ProtectedRoute>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
