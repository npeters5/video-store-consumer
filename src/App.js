import React, { Component } from 'react';
import './App.css';
import VideoStore from './components/VideoStore'

class App extends Component {
  render() {
    return (
      <VideoStore url="http://localhost:3001"/>
    );
  }
}

export default App;
