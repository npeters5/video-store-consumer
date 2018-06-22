import React, { Component } from 'react';
import './Movie.css';

const Movie = (props) => {
  // {"id":1,"title":"Psycho","overview":"When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother. The place seems quirky, but fine… until Marion decides to take a shower.","release_date":"1960-06-16","image_url":"https://image.tmdb.org/t/p/w185/81d8oyEFgj7FlxJqSDXWr8JH8kV.jpg","external_id":539}

  return (
    <div>
      <div><img src={props.movie.image_url} alt={props.movie.title}/></div>
      <div>{props.movie.title}</div>
      <div>{props.movie.overview}</div>
      <div>{props.movie.release_date}</div>
    </div>
  );
}

export default Movie;
