import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './FeaturedFilms.css';
import Movie from './Movie'


class FeaturedFilms extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios.get(`${this.props.url}/movies`)
    .then( (response) => {
      console.log( response.data );
      this.setState({
        movies: response.data
      });
    } )
    .catch( (error) => {
      this.props.setStatus(`Failed to load movies: ${error.message}`, 'success');
    });
  }

  onClickSelect(e, movie) {
    this.props.selectMovieCallback(movie);
    e.preventDefault();
  }

  render () {
    let movies = this.state.movies.map((movie, index) => {
      return (
        <div className="grid-item" key={index}>
          <div>
            <button onClick={ (e) => this.onClickSelect(e, movie) }>Select This Movie
            </button>
          </div>
          <Movie movie={movie}/>
        </div>
      )
    })
    movies = movies.sort(() => .5 - Math.random());
    movies = movies.slice(0,3);
    return (
      <div className="features-container">
        {movies}
      </div>
    );
  }
}

FeaturedFilms.propTypes = {
  // url: PropTypes.string.isRequired,
  // selectMovieCallback: PropTypes.func.isRequired,
};

export default FeaturedFilms;
