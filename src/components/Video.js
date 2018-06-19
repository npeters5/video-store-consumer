import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Video.css';

class Video extends Component {

  // onDeleteClick = (event) => {
  //   console.log(event.target.id);
  //   event.preventDefault();
  //   this.props.removeVideo(event.target.id);
  // }

  render() {

    return (
      <div>
        {this.props.title}
      </div>
    )
  }
}

// Video.propTypes = {
//
// };

export default Video;''
