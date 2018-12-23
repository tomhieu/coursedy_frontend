import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { SecurityUtils } from 'utils/SecurityUtils';
import styles from './Header.module.scss';
import defaultAvatar from '../../../../images/default_avatar.png';
import CoursedyDropDown from '../../../components/Core/CoursedyMultiStep/CoursedyDropDown';
import UserProfileIcon from '../../../components/Core/Icons/UserProfileIcon';
import CourseListIcon from '../../../components/Core/Icons/CourseListIcon';
import SignOutIcon from '../../../components/Core/Icons/SignOutIcon';
import {TutorStatus} from '../../../constants/TutorStatus';
import Image from '../../../components/Core/ImageComponent';

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

  getFirstName(userName) {
    const names = userName.split(' ');
    return names.length > 1 ? names[names.length - 1] : userName;
  }

  render() {
    const { currentUser } = this.props.session;
    const isAproved = this.props.tutorStatus === TutorStatus.VERIFIED;
    const userProfileUrl = SecurityUtils.isAdmin(currentUser) ? '/admin/dashboard/account' : SecurityUtils.isTeacher(currentUser)
      ? '/dashboard/profile' : '/student/dashboard/profile';
    const courseListUrl = SecurityUtils.isAdmin(currentUser) ? '/admin/dashboard/courses' : SecurityUtils.isTeacher(currentUser)
      ? '/dashboard/courses/pending' : '/student/dashboard/courses/enrolling';
    const dropdownOptions = [
      {
        id: 1, link: userProfileUrl, text: this.context.t('user_navigation_basic_info'), icon: <UserProfileIcon width={14} height={14} fillColor="#5E6A6E" />
      },
      {
        id: 2, link: courseListUrl, text: this.context.t('user_navigation_your_course'), icon: <CourseListIcon width={16} height={16} fillColor="#5E6A6E" />
      },
      {
        id: 3, callback: this.props.signOut.bind(this), text: this.context.t('user_navigation_sign_out'), icon: <SignOutIcon width={16} height={16} fillColor="#5E6A6E" />
      }
    ];
    if (SecurityUtils.isTeacher(currentUser) && !isAproved) {
      dropdownOptions.splice(1, 1);
    }
    return (
      currentUser == null ? null
        : (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row" onClick={this.onClickArrow.bind(this)}>
              <div className={styles.userAvatar}>
                <Image
                  src={currentUser.avatar ? currentUser.avatar : defaultAvatar}
                  fallbackSrc={defaultAvatar}
                  alt={currentUser.name}
                  className="full-width-img img-circle"
                />
              </div>
              <span className={styles.userName}>{this.getFirstName(currentUser.name)}</span>
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
  tutorStatus: PropTypes.string,
  signOut: PropTypes.func.isRequired
};

export default cssModules(UserNavigation, styles);
