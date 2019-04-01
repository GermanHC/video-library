import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginContext from './LoginContext'
import './Login.css';

export class Login extends React.Component {
    state = {
        hasChanges: false,
        user: '',
        password: '',
        error: false
    }
    render() {
        const { user, password } = this.state;
        return (
            <form onSubmit={this.login} className="login__form">
                <label>
                    Usuario:&nbsp;
                <input name='user' value={user} onChange={this.update} />
                </label>
                <label>
                    Contraseña:&nbsp;
                <input name='password' type='password' value={password} onChange={this.update} />
                </label>
                <input type='submit' disabled={this.state.busy || !this.state.hasChanges} value='Login' />
                {
                this.state.error &&
                    <p>El usuario y la contraseña son requeridos</p>
                }
                {
                this.state.loginError &&
                    <p>Usuario o contraseña incorrectos</p>
                }
            </form>
        )
    }

    update = event => 
        this.setState({
            error: false,
            hasChanges: true,
            [event.target.name]: event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
    })

    login = async event => {
        event.preventDefault()
        const { user, password } = this.state
        if (user.trim().length === 0 || password.trim().length === 0) {
            return this.setState({ error: true, hasChanges: false })
        }
        this.setState({ busy: true })
        try {
        void await this.props.onLogin({ user, password })
        } catch (loginError) {
            return this.setState({ loginError: true, busy: false })
            }  
        }
}

export default props =>
<LoginContext.Consumer>
  {
    ({ login, logged }) =>
      logged
        ? <Redirect to='/' />
        : <Login onLogin={login} />
  }
</LoginContext.Consumer>