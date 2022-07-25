import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders } from '../redux/actionCreators'
import SingleOrder from './singleOrder/SingleOrder'
import Spinner  from '../spinner/Spinner'

const mapStateToProps = state => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderError: state.orderError,
    token: state.token,
    userId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }
}

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId)
  }

  render() {
    let orders = null;
    if (this.props.orderError) {
      orders = (
        <p
          style={{
            border: "1px solid gray",
            marginTop: "10px",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "4px 4px rgba(0, 0, 0, 0.25)",
            textAlign: 'center'
          }}
        >
          Sorry, failed to load orders!
        </p>
      );
    } else {
      if (this.props.orders.length === 0) {
        orders = (
        <p
          style={{
            border: "1px solid gray",
            marginTop: "10px",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "4px 4px rgba(0, 0, 0, 0.25)",
            textAlign: 'center'
          }}
        >
          Sorry, you have no previous orders!
        </p>
        )
      } else {
        orders = this.props.orders.map((order) => {
          console.log(order);
          return <SingleOrder order={order} key={order.id} />;
        });
      }
    }

    return <div>
      {this.props.orderLoading ? <Spinner /> : orders}
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)