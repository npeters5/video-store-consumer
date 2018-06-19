import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './CustomerList'
import Selections from './Selections'
import RentalLibrary from './RentalLibrary'
import './VideoStore.css';



class VideoStore extends Component {
  constructor () {
    super ();
    this.state = {
      selectedMovie: null,
      selectedCustomer: null,
    }
  }

  selectCustomer = (customer) => {
    console.log("selecting customer " + customer.name);
    this.setState({
      selectedCustomer: customer,
    });
  }

  selectMovie = (movie) => {
    console.log("selecting movie " + movie.title);
    const customer = this.state.selectedCustomer;
    this.setState({
      selectedMovie: movie,
    });
  }

  resetSelection = () => {
    console.log("resetting select data");
    this.setState({
      selectedMovie: null,
      selectedCustomer: null,
    });
  }

  render() {
    const Home = () => (
      <div>
      <h2>Home</h2>
      </div>
    );
    const Search = () => (
      <div>
      <RentalLibrary url={this.props.url} selectMovieCallback={this.selectMovie} />
      </div>
    );
    const Library = () => (
      <RentalLibrary url={this.props.url} selectMovieCallback={this.selectMovie} />
    );
    const Customers = () => (
      <CustomerList url={this.props.url} selectCustomerCallback={this.selectCustomer} />
    );

    return (
      <Router>
      <div>
      <Route render={() => (
      <div>
      <ul>
      <li>
      <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/search">Search</Link>
      </li>
      <li>
      <Link to="/library">Library</Link>
      </li>
      <li>
      <Link to="/customers">Customers</Link>
      </li>
      </ul>
      <hr />
      <Selections customer={this.state.selectedCustomer} movie={this.state.selectedMovie}/>
      <div>
      <button onClick={ (e) => this.resetSelection(e) }>
      Reset
      </button>
      </div>
      <hr />
      </div>
    )} />
      <Route exact path="/" render={Home} />
      <Route path="/search" render={Search} />
      <Route path="/library" render={Library} />
      <Route path="/customers" render={Customers} />
      </div>
      </Router>
    );
  }
}

VideoStore.propTypes = {
  url: PropTypes.string.isRequired,
}

export default VideoStore;
