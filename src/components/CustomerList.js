import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './CustomerList.css';
import Customer from './Customer'

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    this.props.setStatus('Loading customers...', 'pending');
    axios.get(`${this.props.url}/customers`)
    .then( (response) => {
      console.log( response.data );
      this.setState({
        customers: response.data
      });
      this.props.setStatus(`Loaded ${response.data.length} customers`, 'success');
    } )
    .catch( (error) => {
      this.props.setStatus(`Failed to load customers: ${error.message}`, 'error');
      console.log("got to the error");
      console.log(error);
    } );
  }

  onClickSelect(e, customer) {
    this.props.selectCustomerCallback(customer);
  }

  render () {
    const customers = this.state.customers.map((customer, index) => {
      return (
        <div key={index}>
        <Customer customer={customer}/>
        <div><button onClick={ (e) => this.onClickSelect(e, customer) }>Select Customer</button></div>
        </div>
      )
    })
    return (
      <div>
      {customers}
      </div>
    );
  }
}

CustomerList.propTypes = {
  url: PropTypes.string.isRequired,
  selectCustomerCallback: PropTypes.func.isRequired,
};

export default CustomerList;
