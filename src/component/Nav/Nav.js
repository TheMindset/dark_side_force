import React from 'react'
import './Nav.scss'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Nav = ({ user }) => {
  const { name, quote, rank } = user
  return (
    <nav>
      <div className='user-profile'>
        <h1> {name} </h1>
        <p> "{quote}" </p>
        <h2> {rank} </h2>
      </div>

      <NavLink to='/movies' className='nav-link'>Movies</NavLink>
      <NavLink to='/'>
        <button>LogOut</button>
      </NavLink>
    </nav>
  )
}

export default Nav

Nav.propTypes = {
  user: PropTypes.object.isRequired
}