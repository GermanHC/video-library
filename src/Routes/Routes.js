import React from 'react'
import {Switch, Route} from 'react-router'

import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Details from '../Details/Details'

export default props =>
<Switch>
    <Route exact path='/' component={Movies} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/details' component={Details} />
    <Route exact path='/details/:id' component={Details} />

</Switch>