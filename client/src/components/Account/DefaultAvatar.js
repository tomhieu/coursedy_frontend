import React, { Component } from 'react';
import {
  generateRandomColorFromUsername, generateShortName
} from 'utils/UserUtils';
import { SERVER_NAME } from 'utils/CommonConstant';


class DefaultAvatar extends Component {
  render() {
    let { username, url } = this.props;

    if (url) {
      return (
        <img src={SERVER_NAME + url}/>
      );
    }

    let color = generateRandomColorFromUsername(username);
    let style = {};

    if (color) {
      style.background = color;
    }

    return (
      <div className={this.props.classNames} style={style}>
        {username ? generateShortName(username) : ''}
      </div>
    );
  }
}


DefaultAvatar.propTypes = {
  username: React.PropTypes.string.isRequired
};

export default DefaultAvatar;
