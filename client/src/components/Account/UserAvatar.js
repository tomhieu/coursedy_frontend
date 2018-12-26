import React, { Component } from 'react';
import {
  generateRandomColorFromUsername, generateShortName
} from 'utils/UserUtils';
import { SERVER_NAME } from 'utils/CommonConstant';
import Image from '../Core/ImageComponent';
import defaultAvatar from '../../../images/default_avatar.png';


class UserAvatar extends Component {
  render() {
    const { username, url } = this.props;

    if (url) {
      return (
        <Image
          src={SERVER_NAME + url}
          fallbackSrc={defaultAvatar}
          className="full-width-img img-circle"
        />
      );
    }

    const color = generateRandomColorFromUsername(username);

    return (
      <div className={this.props.classNames} style={{ background: color }}>
        {username ? generateShortName(username) : ''}
      </div>
    );
  }
}


UserAvatar.propTypes = {
  username: React.PropTypes.string.isRequired
};

export default UserAvatar;
