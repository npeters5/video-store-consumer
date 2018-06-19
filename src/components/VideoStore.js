import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import Video from './Video'
import SearchForm from './SearchForm'
import Customer from './Customer'


class VideoStore extends Component {

  constructor() {
    super();

    this.state = {
      videos: [],
      customers: [],
      searchResults: [],
    };
  }

  componentDidMount = () => {
    console.log("Component did mount was called");
    axios.get('http://localhost:3001/movies')
    .then((response) => {
      console.log(response.data);
      this.setState({videos: response.data});
    })
    .catch((error) => {
      this.setState({error: error.message});
    });
    axios.get('http://localhost:3001/customers')
    .then((response) => {
      console.log(response.data);
      this.setState({customers: response.data});
    })
    .catch((error) => {
      this.setState({error: error.message});
    });
  }

  renderVideoList = () => {
    const videoList = this.state.videos.map((item, index) => {
      console.log(item);
      return (
        <li key={index}>
          <Video title={item.title}/>
        </li>
      );
    });
    return videoList;
  }

  renderCustomerList = () => {
    const customerList = this.state.customers.map((item, index) => {
      console.log(item);
      return (
        <li key={index}>
          <Customer name={item.name}/>
        </li>
      );
    });
    return customerList;
  }

  getVideosFromSearch = (searchTerm) => {
    axios.get('http://localhost:3001/movies?query=' + searchTerm)
    .then((response) => {
      console.log(response.data);
      this.setState({searchResults: response.data});
    })
    .catch((error) => {
      this.setState({error: error.message});
    });
  }

  renderSearchResults = () => {
    const results = this.state.searchResults.map((item, index) => {
      console.log(item);
      return (
        <li key={index}>
          <Video title={item.title}/>
        </li>
      );
    });
    return results;
  }

  render() {

    const Home = () => (
      <div>
        <h2>Home</h2>
      </div>
    );
    const Search = () => (
      <div>
        <h2>Search</h2>
        <SearchForm
          getVideosCallback={this.getVideosFromSearch}
        />
        <ul>
          {this.renderSearchResults()}
        </ul>
      </div>
    );
    const Library = () => (
      <ul>
        {this.renderVideoList()}
      </ul>
    );
    const Customers = () => (
      <ul>
        {this.renderCustomerList()}
      </ul>
    );

    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/customers">Customers</Link></li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route path="/library" component={Library} />
          <Route path="/customers" component={Customers} />
        </div>
      </Router>
    );
  }
}

export default VideoStore;
