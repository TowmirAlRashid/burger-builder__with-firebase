import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './Header.css'

import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const Header = (props) => {
  let links = null;
  if(props.token === null) {
    links = (
      <NavItem>
        <NavLink exact="true" to="/login" className="navLink">
          Log In
        </NavLink>
      </NavItem>
    )
  } else {
    links = (
      <Nav className="mr-md-5">
        <NavItem>
          <NavLink exact="true" to="/" className="navLink">
            Burger Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact="true" to="/order" className="navLink">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact="true" to="/logout" className="navLink">
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  return (
    <div className='navigation'>
      <Navbar style={{
        backgroundColor: '#d70f64',
        height: '70px'
      }}>
        <NavbarBrand href='/' className='mr-auto ml-md-5 brand'>
          <img src={Logo} alt='logo' width='80px' />
        </NavbarBrand>
        {links}
      </Navbar>
    </div>
  )
}

export default connect(mapStateToProps)(Header)