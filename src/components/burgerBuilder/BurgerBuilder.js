import React, { Component } from 'react'
import Burger from './burger/Burger'
import Controls from './controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Summary from './summary/Summary';

import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (type) => dispatch(addIngredient(type)),
    removeIngredient: (type) => dispatch(removeIngredient(type)),
    updatePurchasable: () => dispatch(updatePurchasable())
  }
}

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  addIngredientHandler = type => {
    this.props.addIngredient(type)
    this.props.updatePurchasable()
  }

  removeIngredientHandler = type => {
    this.props.removeIngredient(type)
    this.props.updatePurchasable()
  } 

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            price={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
            <Summary ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <NavLink to="/checkout">
              <Button style={{ backgroundColor: "#d70f64" }}>
                Continue to Checkout!
              </Button>
            </NavLink>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)