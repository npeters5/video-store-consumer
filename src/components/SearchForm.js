import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './SearchForm.css';
import SearchResults from './SearchResults'


class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      results: [],
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
    this.props.setStatus(`Searching for "${this.state.title}"...`, 'pending');
    console.log(`searching for ${this.state.title}`);
    axios.get(`${this.props.url}/movies?query=${this.state.title}`)
    .then((response) => {
      this.props.setStatus(`Found ${response.data.length} results for ${this.state.title}`, 'success');
      console.log(response.data);
      this.setState({results: response.data});
    })
    .catch((error) => {
      this.props.setStatus(`Could not search for "${this.state.title}": ${error.message}`, 'error');
    });
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
        <SearchResults
          url={this.props.url}
          results={this.state.results}
          setStatus={this.props.setStatus}
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  url: PropTypes.string.isRequired,
}

export default SearchForm;
