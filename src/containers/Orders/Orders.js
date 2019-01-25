import React, { Component } from 'react';
import './Orders.scss';
import axios from '../../axios';
import ErrorHandler from '../../hoc/ErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from './Order/Order';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  };

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      (this.props.orders.length === 0) ?
        orders = <p>You do not have any orders yet.</p> :
        orders = this.props.orders.map(order => (
          <Order key={order.id} products={order.products} price={order.price} />
        ))
    };

    return (
      <div className="orders-container">
        <h2 className="main-title">Your Orders</h2>
        <p className="main-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend ligula neque, at faucibus metus trum sedru.</p>
        <ul className="order-list">
          {orders}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));