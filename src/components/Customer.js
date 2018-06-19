import React, { Component } from 'react';
import './Customer.css';
import PropTypes from 'prop-types';


class Customer extends Component {

  // onDeleteClick = (event) => {
  //   console.log(event.target.id);
  //   event.preventDefault();
  //   this.props.removeCustomer(event.target.id);
  // }

  render() {

    return (
      <div>
        {this.props.name}
      </div>
    )
  }
}

// Customer.propTypes = {
//
// };

export default Customer;
