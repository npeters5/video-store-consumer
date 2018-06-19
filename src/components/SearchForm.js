import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }

  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value
    const updateState = {};
    updateState[fieldName] = fieldValue;
    this.setState(updateState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.getVideosCallback(this.state.title);
    // this.clearForm();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onFormSubmit}>
          <div>
            <label  htmlFor="title">Search movies by title: </label>
            <input
              name="title"
              value={this.state.title}
              type="text"
              onChange={this.onFieldChange}
            />
          </div>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default SearchForm;
