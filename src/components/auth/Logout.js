import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router'

import { logout } from '../redux/actionCreators'

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
  
  render() {
    return (
      <Navigate to='/' />
    )
  }
}

export default connect(null, mapDispatchToProps)(Logout)