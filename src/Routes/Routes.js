import React from 'react'
import {Switch, Route} from 'react-router'

import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Details from '../Details/Details'
import requireLogin from '../Login/requiresLogin'
import Search from '../Search/Search';

const requiresLogin = requireLogin('/login')

export default props =>
<Switch>
    <Route exact path='/' component={requiresLogin(Movies)} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/details/:id' component={requiresLogin(Details)} />
    <Route exact path='/search' component={requiresLogin(Search)} />
    <Route component={() => <p>Error 404, no hemos encontrado lo que buscas</p>} />
</Switch>