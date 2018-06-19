import React, { Component } from 'react';
import './Customer.css';

const Customer = (props) => {
  // {"id":1,"name":"Shelley Rocha","registered_at":"2015-04-29T14:54:14.000Z","address":"Ap #292-5216 Ipsum Rd.","city":"Hillsboro","state":"OR","postal_code":"24309","phone":"(322) 510-8695","account_credit":13.15,"movies_checked_out_count":0}
  return (
    <div>
      <div>{props.customer.name} (Checked out: {props.customer.movies_checked_out_count})</div>
      <div>{props.customer.address}</div>
      <div>{props.customer.city} {props.customer.state} {props.customer.postal_code}</div>
      <div>{props.customer.phone}</div>
    </div>
  );
}

export default Customer;
