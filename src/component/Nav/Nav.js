import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Nav = ({ user }) => {
  return (
    <nav>
      <div className='user-profile'>
        <h1> {user.name} </h1>
        <p> "{user.quote}" </p>
        <h2> {user.rank} </h2>
      </div>

      <NavLink to='/movies' className='nav-link'>Movies</NavLink>
      <NavLink to='/'>
        <button>LogOut</button>
      </NavLink>
    </nav>
  )
}

export default Nav