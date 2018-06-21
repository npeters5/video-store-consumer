import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './SearchResults.css';
import Movie from './Movie'

class SearchResults extends Component {

  onClickSelect(e, movie) {
    console.log(e);
    console.log(movie);
    this.props.setStatus(`Adding movie "${movie.title}" to library...`, 'pending');
    axios.post(`${this.props.url}/movies`, movie)
    .then((response) => {
      console.log(response);
      this.props.setStatus(`Successfully added "${movie.title}" to library`, 'success');
      alert(`Successfully added ${movie.title} to Library`)
    })
    .catch((error) => {
      this.props.setStatus(
        `Could not add "${movie.title}" to library: ${error.message}`, 'error');
      });
  }

  render () {
    console.log(results);
    const results = this.props.results.map((movie, index) => {
      return (
        <div key={index}>
          <Movie
            title={movie.title}
            movie={movie}
          />
          <button onClick={ (e) => this.onClickSelect(e, movie) } >
          Add to Library
          </button>
        </div>
      )
    })
    return (
      <div>
      {results}
      </div>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
