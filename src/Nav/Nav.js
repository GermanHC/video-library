import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'
import LoginContext from '../Login/LoginContext'

export default props =>
    <nav className='menu'>
        <ul className='menu__options' >
            <li className='menu__option'>
                <Link className='menu__link' to='/'>Discover</Link>
            </li>
            <li className='menu__option'>
                <Link className='menu__link' to='/search'>Search</Link>
            </li>
            <li className='menu__option'>
                <Link className='menu__link' to='/collections'>Collections</Link>
            </li>
            <LoginContext.Consumer>
                {
                ({ logout }) =>
                    <li className='menu__option' onClick={logout}>
                    Logout
                    </li>
                }
            </LoginContext.Consumer>
        </ul>
    </nav>