import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap'

import Spinner from '../../spinner/Spinner'

import axios from 'axios';

import { resetIngredients } from '../../redux/actionCreators'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetIngredients: () => dispatch(resetIngredients())
  }
}

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: '',
      phone: '',
      paymentMethod: 'Cash on Delivery'
    },
    isLoading: false,
    modalOpen: false,
    modalMsg: ''
  }

  inputChangeHandler = e => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value
      }
    })
  }

  submitHandler = (e) => {
    this.setState({
      isLoading: true
    })

    const order = {
      ingredients: this.props.ingredients,
      customerInfo: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date().toISOString(),
      userId: this.props.userId
    }

    axios.post("https://burger-builder-7ad92-default-rtdb.firebaseio.com/orders.json?auth=" + this.props.token, order)
    .then(response => {
      if(response.status === 200) {
        this.setState({
          isLoading: false,
          modalOpen: true,
          modalMsg: 'Order placed successfully!'
        })
        this.props.resetIngredients()
      } else {
        this.setState({
          isLoading: false,
          modalOpen: true,
          modalMsg: "Something went wrong! Please order again!",
        });
      }
    })
    .catch(error => {
      this.setState({
        isLoading: false,
        modalOpen: true,
        modalMsg: "Something went wrong! Please order again!",
      });
    })

    e.preventDefault()
  }

  render() {
    const form = (
      <div>
        <h4
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "5px 5px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
          }}
        >
          Payment: {this.props.totalPrice} BDT
        </h4>
        <form
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "5px 5px rgba(0, 0, 0, 0.25)",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            placeholder="Enter your address"
            className="form-control"
            onChange={this.inputChangeHandler}
          ></textarea>
          <br />
          <input
            name="phone"
            value={this.state.values.phone}
            placeholder="Enter mobile number"
            className="form-control"
            onChange={this.inputChangeHandler}
          />
          <br />
          <select
            name="paymentMethod"
            value={this.state.values.paymentMethod}
            className="form-control"
            onChange={this.inputChangeHandler}
          >
            <option>Cash on Delivery</option>
            <option>Bkash</option>
            <option>Nagad</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#d70f64", marginRight: "10px" }}
            onClick={this.submitHandler}
            disabled={!this.props.purchasable}
          >
            Place Order
          </Button>
          <NavLink to="/">
            <Button color="secondary">
              Cancel
            </Button>
          </NavLink>
        </form>
      </div>
    );

    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
            <NavLink to="/">
              <Button color="secondary">Go Back</Button>
            </NavLink>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)