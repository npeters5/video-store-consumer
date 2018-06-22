import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './CustomerList';
import Selections from './Selections';
import RentalLibrary from './RentalLibrary';
import './VideoStore.css';
import SearchForm from './SearchForm';
import StatusBar from './StatusBar';
import FeaturedFilms from './FeaturedFilms';
import axios from 'axios';
import MarqueeDouble from 'react-marquee-double';


class VideoStore extends Component {
  constructor () {
    super ();
    this.state = {
      selectedMovie: null,
      selectedCustomer: null,
      status: {
        message: '',
      }
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

  setStatus = (message, type) => {
    this.setState({
      status: { message, type }
    });
  }

  clearStatus = () => {
    this.setState({ status: { message: '' }})
  }

  resetSelection = () => {
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
      .then( (response) => {
        this.setStatus(
          `Successfully checked out ${this.state.selectedMovie.title} to ${this.state.selectedCustomer.name}`,
          'success');
        })
        .catch((error)=> {
          this.setStatus(
          `Could not check out ${this.state.selectedMovie.title} to ${this.state.selectedCustomer.name}: ${error.message}`,
          'error');
          // console.log(error);
        });
      }
    }

    render() {
      const Home = () => (
        <section>
          <h2>Featured Films</h2>
          <FeaturedFilms
            className=""
            url={this.props.url}
            selectMovieCallback={this.selectMovie}
            setStatus={this.setStatus}
          />
        </section>
      );

      const Search = () => (
        <div>
          <SearchForm
            url={this.props.url}
            setStatus={this.setStatus}
          />
        </div>
      );

      const Library = () => (
        <div>
          <RentalLibrary
            url={this.props.url}
            selectMovieCallback={this.selectMovie}
            setStatus={this.setStatus}
          />
        </div>
      );

      const Customers = () => (
        <div>
          <CustomerList
            url={this.props.url}
            selectCustomerCallback={this.selectCustomer}
            setStatus={this.setStatus}
          />
        </div>
      );

      return (
        <Router>
          <div>
            <Route render={() => (
              <header>
              <MarqueeDouble
                ref={(ref) => {this.marquee = ref}}
                step={1} interval={20}
                autoStart={true}
                direction={'left'}
                delay={1000}
                onStart={()=>{this.marquee.delay()}}>
                <h1 className="marquee">_______________________________Welcome Online_______________________________</h1>
              </MarqueeDouble>
                <div className="flex-container">
                  <img src="https://media.giphy.com/media/8b29QJQgVwUW4/giphy.gif" height="240"/>
                  <ul>
                    <li><h1>Video King</h1></li>
                    <li><h3>Video rentals on the World Wide Web</h3></li>
                    <li className="nav-links"><Link to="/">Home</Link></li>
                    <li className="nav-links"><Link to="/search">Search</Link></li>
                    <li className="nav-links"><Link to="/library">Library</Link></li>
                    <li className="nav-links"><Link to="/customers">Customers</Link></li>
                  </ul>
                  <img src="https://media.giphy.com/media/l44QvKoQuUD3xPZKg/giphy.gif" height="240"/>
                </div>
                <hr />
                <Selections customer={this.state.selectedCustomer} movie={this.state.selectedMovie}/>
                <div>
                  <button onClick={ (e) => this.resetSelection(e) }>
                    Reset Selections
                  </button>
                  <button onClick={ (e) => this.checkoutSelection(e) }>
                    Checkout
                  </button>
                </div>
                <hr />
                <StatusBar
                  {...this.state.status}
                  clearStatus={this.clearStatus}
                />
              </header>
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
