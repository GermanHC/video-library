import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginContext from './LoginContext'

const requiresLogin = loginUrl =>
  // HOC
  Component => props =>
    <LoginContext.Consumer>
      {
      ({ logged }) =>
          logged
            ? <Component {...props} />
            : <Redirect to={loginUrl} />
      }
    </LoginContext.Consumer>

export default requiresLogin