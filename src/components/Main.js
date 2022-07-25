import React, { Component } from 'react'
import BurgerBuilder from './burgerBuilder/BurgerBuilder'
import Header from './header/Header'
import Orders from './orders/Orders'
import Checkout from './orders/checkout/Checkout'
import Logout from './auth/Logout'
import Auth from './auth/Auth'

import { Route, Routes } from 'react-router-dom'

import { connect } from 'react-redux'

import { authCheck } from './redux/actionCreators'

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(authCheck())
  }
}

class Main extends Component {
  componentDidMount() {
    this.props.authCheck()
  }
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <React.Fragment>
          <Routes>
            <Route path="/login" element={<Auth />} />
          </Routes>
        </React.Fragment>
      );
    } else {
      routes = (
        <React.Fragment>
          <Routes>
            <Route path="/order" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" exact element={<BurgerBuilder />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Header />
        <div className="container">{routes}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)