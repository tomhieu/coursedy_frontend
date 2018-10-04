import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './StudentCourseDetailAction.module.scss';
import { globalHistory } from '../../../utils/globalHistory';
import DateUtils from '../../../utils/DateUtils';
import {FacebookShareButton, GooglePlusShareButton} from 'react-share';
import FacebookIcon from '../../Core/Icons/FacebookIcon';
import GooglePlusIcon from '../../Core/Icons/GooglePlusIcon';
import LinkedinShareButton from 'react-share/es/LinkedinShareButton';
import LinkinIcon from '../../Core/Icons/LinkinIcon';
import ObjectUtils from '../../../utils/ObjectUtils';


class CourseDetailAction extends Component {
  constructor() {
    super();
    this.state = {
      show_require_login_modal: false,
      show_enroll_status_modal: false
    };
  }

  submitEnrollCourse() {
    // do nothing if course is already enrolled
    if (this.props.isEnrolled) {
      return;
    }
    if (!this.props.user) {
      // Show require login modal
      this.showRequireLoginModal();
    } else {
      this.props.openEnrollCoursePopup();
    }
  }

  showRequireLoginModal() {
    this.props.showWarningPopup(this.context.t('require_login'),
      this.context.t('course_enroll_require_login_message'),
      this.redirectToLogin.bind(this));
  }

  redirectToLogin() {
    globalHistory.push('/login');
  }

  showEnrollCourseStatusModal() {
    this.setState({
      show_enroll_status_modal: true
    });
  }

  render() {
    const {
      course, user, course_sections, isEnrolled
    } = this.props;
    const courseDetailsFullUrl = window.location.href;
    return (
      <div className={styles.courseDetailAction}>
        <div className="d-flex flex-column">
          <div className={styles.courseCoverImage}>
            <img src={course.cover_image ? course.cover_image : 'http://placehold.it/1366x768'} alt="" />
          </div>
          {
            course.tuition_fee
              ? (
                <div className={styles.courseFee}>
                  { ObjectUtils.currencyFormat(course.tuition_fee, course.currency) }
                </div>
              ) : null
          }
          <ul className="listing-box-list">
            <li>
              <div className="row gap-10">
                <div className="col-xs-8 col-sm-8">
                  <i className="fa fa-clock-o mr-5"/>
                  {' '}
                  {this.context.t('period')}
                </div>
                <div className="col-xs-4 col-sm-4 text-right font600">{course.period}</div>
              </div>
            </li>
            <li>
              <div className="row gap-10">
                <div className="col-xs-6 col-sm-6">
                  <i className="fa fa-calendar mr-5"/>
                  {' '}
                  {this.context.t('start_time')}
                </div>
                <div className="col-xs-6 col-sm-6 text-right font600">{DateUtils.formatDate(course.start_date)}</div>
              </div>
            </li>
            <li>
              <div className="row gap-10">
                <div className="col-xs-8 col-sm-8">
                  <i className="fa fa-pencil-square-o mr-5"/> {' ' + this.context.t('course_lessons')}
                </div>
                <div className="col-xs-4 col-sm-4 text-right font600">{' ' + course_sections.length}</div>
              </div>
            </li>
            <li>
              <div className="row gap-10">
                <div className="col-xs-8 col-sm-8">
                  <i className="fa fa-users mr-5"/>{' ' + this.context.t('number_of_students')}
                </div>
                <div className="col-xs-4 col-sm-4 text-right font600">{' ' + course.number_of_students}</div>
              </div>
            </li>
          </ul>
          <div className={styles.courseShare}>
            <div className={styles.seperateLine} />
            <span className={styles.title}>{this.context.t('share_course_with_friend')}</span>
            <div className="d-flex flex-row justify-content-center">
              <div className={styles.shareSocialIcon}>
                <FacebookShareButton url={courseDetailsFullUrl}>
                  <FacebookIcon />
                </FacebookShareButton>
              </div>
              <div className={styles.shareSocialIcon}>
                <GooglePlusShareButton url={courseDetailsFullUrl}>
                  <GooglePlusIcon />
                </GooglePlusShareButton>
              </div>
              <div className={styles.shareSocialIcon}>
                <LinkedinShareButton url={courseDetailsFullUrl}>
                  <LinkinIcon />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseDetailAction.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailAction.propTypes = {
  openEnrollCoursePopup: React.PropTypes.func.isRequired,
  isEnrolled: React.PropTypes.bool.isRequired
};

export default cssModules(CourseDetailAction, styles);
