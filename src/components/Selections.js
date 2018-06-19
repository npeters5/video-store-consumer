import React, { Component } from 'react';
import './Selections.css';


const Selections = (props) => {
  const customer = props.customer ? props.customer.name : "None";
  const movie = props.movie ? props.movie.title : "None";
  return (
    <div>
      <div>Selected Customer: {customer} | Selected Movie: {movie}</div>
    </div>
  );
}


export default Selections;
