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
    axios.get(`${this.props.url}/customers`)
    .then( (response) => {
      console.log( response.data );
      this.setState({
        customers: response.data
      });
    } )
    .catch( (error) => {
      console.log("got to the error");
      console.log(error);
      this.setState({
        error: error.message
      });
    } );
  }

  onClickSelect(e, customer) {
    this.props.selectCustomerCallback(customer);
    e.preventDefault();
  }

  render () {
    const customers = this.state.customers.map((customer, index) => {
      return (
        <div key={index}>
        <Customer customer={customer}/>
        <div><button onClick={ (e) => this.onClickSelect(e, customer) }>Select</button></div>
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
