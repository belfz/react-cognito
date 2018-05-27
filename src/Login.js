import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import AuthContext from './AuthContext';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit (e, onLoggedIn) {
    e.preventDefault();
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(onLoggedIn)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ onLoggedIn }) => 
          <form onSubmit={(e) => this.onSubmit(e, onLoggedIn)}>
            <input type="text" value={this.state.username} onChange={({ target }) => this.setState({username: target.value})} />
            <input type="password" value={this.state.password} onChange={({ target }) => this.setState({password: target.value})} />
            <input type="submit" value="submit" />
          </form>
        }
      </AuthContext.Consumer>
    );
  }
}

export default Login;
