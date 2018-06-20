import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './SearchResults.css';
import Movie from './Movie'

class SearchResults extends Component {

  onClickSelect(e, video) {
    console.log(e);
    console.log(video);
    axios.post(`${this.props.url}/movies`, video)
    .then((response) => {
      console.log(response);
    //   video.id = response.data.card.id;
    //   cards.push({card: card});
    //   this.setState({
    //     cards,
    //     message: `Successfully added card`
    //   });
    //   alert( `Successfully added card`)
    // })
    // .catch((error) => {
    //   this.setState({
    //     message: error.message,
    //   });
    });
  }

  render () {
    console.log(results);
    const results = this.props.results.map((video, index) => {
      return (
        <div key={index}>
          <Movie
            movie={video}
          />
          <button onClick={ (e) => this.onClickSelect(e, video) } >
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
