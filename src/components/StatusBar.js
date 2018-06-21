import PropTypes from 'prop-types';
import React from 'react';

import './StatusBar.css';

class StatusBar extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success', 'pending']),
    clearStatus: PropTypes.func.isRequired,
  }



  render() {
    let className = "status-bar "
    if (this.props.message.length === 0) {
      className += "status-bar--hide"
    } else {
      className += `status-bar--${this.props.type}`;
    }
    return(
      <div className={className}>
        <p className="status-bar__text">
          {this.props.message}
        </p>
        <button
          className="status-bar__button"
          onClick={this.props.clearStatus}
          >
          X
        </button>
      </div>
    );
  }
}

export default StatusBar;
