import React from 'react'

class Login extends React.Component {
    state = {
        hasChanges: false,
        user: '',
        password: '',
        error: false
    }
    render() {
        const { user, password } = this.state;
        return (
            <form onSubmit={this.login}>
                <label>
                    Usuario:&nbsp;
                <input name='user' value={user} onChange={this.update} />
                </label>
                <label>
                    Contraseña:&nbsp;
                <input name='password' type='password' value={password} onChange={this.update} />
                </label>
                <input type="submit" disabled={!this.state.hasChanges} value='Login' />
                {
                    this.state.error &&
                    <p>Usuario o contraseña incorrectos</p>
                }
            </form>
        )
    }
    update = event => this.setState({
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
        //this.setState({busy: true})
        //const response = await fetch(USERS_URL)
        //const {results: users} = await response.json()
        //const found = users.find(candidate =>
        //          candidate.login.username = user &&
        //          candidate.login.password = password
        //)
        //this.setState({busy:false})
        //if (!found) {
        // return this.setState({loginError: true})
        //}
        //alert(JSON.stringfy(found))
        //this.props.onLogin(found);
        //alert(JSON.stringify(this.state));
    }
}

export default Login