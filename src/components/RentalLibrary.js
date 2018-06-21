import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './RentalLibrary.css';
import Movie from './Movie'

class RentalLibrary extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.props.setStatus('Loading library...', 'pending');
    axios.get(`${this.props.url}/movies`)
    .then( (response) => {
      this.props.setStatus(`Successfully loaded ${response.data.length} movies from the rental library`, 'success');
      console.log( response.data );
      this.setState({
        movies: response.data
      });
    } )
    .catch( (error) => {
      this.props.setStatus(`Failed to load movies: ${error.message}`, 'success');
      console.log("got to the error");
      console.log(error);
    });
  }

  onClickSelect(e, movie) {
    this.props.selectMovieCallback(movie);
    e.preventDefault();
  }

  render () {
    const movies = this.state.movies.map((movie, index) => {
      return (
        <div key={index}>
        <Movie movie={movie}/>
        <div><button onClick={ (e) => this.onClickSelect(e, movie) }>Select</button></div>
        </div>
      )
    })
    return (
      <div>
      {movies}
      </div>
    );
  }
}

RentalLibrary.propTypes = {
  url: PropTypes.string.isRequired,
  selectMovieCallback: PropTypes.func.isRequired,
};

export default RentalLibrary;
