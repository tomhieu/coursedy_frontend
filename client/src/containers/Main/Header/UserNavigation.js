import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { SecurityUtils } from 'utils/SecurityUtils';
import styles from './Header.module.scss';
import defaultAvatar from '../../../../images/default_avatar.png';
import CoursedyDropDown from '../../../components/Core/CoursedyMultiStep/CoursedyDropDown';

class UserNavigation extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false
    };
  }

  onClickArrow() {
    const isOpenDropDown = this.state.show;
    this.setState({ show: !isOpenDropDown });
  }

  onCloseDropDown() {
    this.setState({ show: false });
  }

  render() {
    const { currentUser } = this.props.session;
    const userProfileUrl = SecurityUtils.isAdmin(currentUser) ? '/admin/dashboard/account' : SecurityUtils.isTeacher(currentUser)
      ? '/dashboard/profile' : '/student/dashboard/profile';
    const courseListUrl = SecurityUtils.isAdmin(currentUser) ? '/admin/dashboard/courses' : SecurityUtils.isTeacher(currentUser)
      ? '/dashboard/courses/list' : '/student/dashboard/courses/enrolled';
    const dropdownOptions = [
      { id: 1, link: userProfileUrl, text: this.context.t('user_navigation_basic_info') },
      { id: 2, link: courseListUrl, text: this.context.t('user_navigation_your_course') },
      { id: 3, callback: this.props.signOut.bind(this), text: this.context.t('user_navigation_sign_out') }
    ];
    return (
      currentUser == null ? null
        : (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className={styles.userAvatar}>
                <img
                  className="media-object full-width"
                  onClick={this.onClickArrow.bind(this)}
                  src={currentUser.avatar ? currentUser.avatar : defaultAvatar}
                  alt={currentUser.name}
                />
              </div>
            </div>
            <CoursedyDropDown
              items={dropdownOptions}
              isOpen={this.state.show}
              bgColor="#F4FAFA"
              closeDropDown={this.onCloseDropDown.bind(this)}
            />
          </div>
        )
    );
  }
}


UserNavigation.contextTypes = {
  t: React.PropTypes.func.isRequired
};

UserNavigation.propTypes = {
  session: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};

export default cssModules(UserNavigation, styles);
