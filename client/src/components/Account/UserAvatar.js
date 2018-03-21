import React, { Component } from 'react';
import {
  generateRandomColorFromUsername, generateShortName
} from 'utils/UserUtils';
import { SERVER_NAME } from 'utils/CommonConstant';


class UserAvatar extends Component {
  render() {
    const { username, url } = this.props;

    if (url) {
      return (
        <img src={SERVER_NAME + url}/>
      );
    }

    const color = generateRandomColorFromUsername(username);

    return (
      <div className={this.props.classNames} style={{background: color}}>
        {username ? generateShortName(username) : ''}
      </div>
    );
  }
}


UserAvatar.propTypes = {
  username: React.PropTypes.string.isRequired
};

export default UserAvatar;
