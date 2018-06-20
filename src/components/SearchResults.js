import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './SearchResults.css';
import Movie from './Movie'

class SearchResults extends Component {

  onClickSelect(e, movie) {
    console.log(e);
    console.log(movie);
    axios.post(`${this.props.url}/movies`, movie)
    .then((response) => {
      console.log(response);
      this.setState({
        message: `Successfully added movie to Library`
      });
      alert( `Successfully added ${movie.title} to Library`)
    })
    .catch((error) => {
      this.setState({
        message: error.message,
      });
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
