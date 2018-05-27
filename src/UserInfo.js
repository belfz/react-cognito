import React from 'react';
import AuthContext from './AuthContext';

const UserInfo = () => {
  return (
    <AuthContext.Consumer>
    {({ user }) =>
      <div>
        hi, {user.username}
      </div>
    }
    </AuthContext.Consumer>
  );
}

export default UserInfo;
