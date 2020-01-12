import React from 'react'
import './Nav.scss'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'

const Nav = ({ user, logOut, numFav}) => {
  const { name, quote, rank } = user
  return (
    <nav>
      <div className='user-profile'>
        <div className='inner'>
          <span>i</span>
          <p>Name: {name} </p>
          <p>Quote: "{quote}" </p>
          <p>Rank :{rank} </p>
        </div>
      </div>
      <NavLink to='/movies' className='nav-link'>Movies</NavLink>
      <NavLink to='/favorites' className='nav-link'>Favorites ({numFav})</NavLink>
      <Link onClick={logOut} to='/' className='nav-link'>
        <button >LogOut</button>
      </Link>
    </nav>
  )
}

export default Nav

Nav.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  numFav: PropTypes.number.isRequired
}