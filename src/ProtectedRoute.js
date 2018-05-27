import React from 'react';
import { Route } from 'react-router-dom';
import AuthContext from './AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children, exact, path }) => {
  return (
    <AuthContext.Consumer>
      {({ isLoggedIn }) =>
        <Route exact={!!exact} path={path} render={() =>
          isLoggedIn ? children : <Login />
        } />
      }
    </AuthContext.Consumer>
  );
};

export default ProtectedRoute;
