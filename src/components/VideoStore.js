import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './CustomerList'
import Selections from './Selections'
import RentalLibrary from './RentalLibrary'
import './VideoStore.css';
import SearchForm from './SearchForm'
import axios from 'axios';


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
    this.setState({
      selectedMovie: movie,
    });
  }

  resetSelection = (e) => {
    console.log("resetting select data");
    this.setState({
      selectedMovie: null,
      selectedCustomer: null,
    });
  }

  checkoutSelection = (e) => {
    if ( this.state.selectedCustomer!=null && this.state.selectedMovie!=null ) {
      let dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      axios.post(`${this.props.url}/rentals/${this.state.selectedMovie.title}/check-out?customer_id=${this.state.selectedCustomer.id}&due_date=${dueDate}`)
      .then(
        (response) => {
          console.log(response);
        })
        .catch((error)=> {
          console.log(error);
          this.setState({
            message: error.message
          });
        });
      }
    }

    render() {
      const Home = () => (
        <div>
        <h2>Home</h2>
        </div>
      );

      const Search = () => (
        <div>
        <SearchForm
        url={this.props.url}
        />
        </div>
      );

      const Library = () => (
        <div>
        <RentalLibrary url={this.props.url} selectMovieCallback={this.selectMovie} />
        </div>
      );

      const Customers = () => (
        <div>
        <CustomerList url={this.props.url} selectCustomerCallback={this.selectCustomer} />
        </div>
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
          <button onClick={ (e) => this.checkoutSelection(e) }>
          Checkout
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
