import React from 'react'
import LoginContext from './LoginContext'

export default Component => props =>
  <LoginContext.Consumer>
    {
      ({ user }) =>
        <Component {...props} user={user} />
    }
  </LoginContext.Consumer>