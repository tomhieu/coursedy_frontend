import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import FacebookShareCount from 'react-share/es/FacebookShareCount';
import FacebookShareButton from 'react-share/es/FacebookShareButton';
import GooglePlusShareButton from 'react-share/es/GooglePlusShareButton';
import LinkedinShareButton from 'react-share/es/LinkedinShareButton';
import styles from './CourseDetailAction.module.scss';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import CourseAccessIcon from '../../Core/Icons/CourseAccessIcon';
import CourseMaterialIcon from '../../Core/Icons/CourseMaterialIcon';
import CourseLessonlIcon from '../../Core/Icons/CourseLessonlIcon';
import ObjectUtils from '../../../utils/ObjectUtils';
import { globalHistory } from '../../../utils/globalHistory';
import FacebookIcon from '../../Core/Icons/FacebookIcon';
import GooglePlusIcon from '../../Core/Icons/GooglePlusIcon';
import LinkinIcon from '../../Core/Icons/LinkinIcon';


class CourseDetailAction extends Component {
  constructor() {
    super();
    this.state = {
      show_require_login_modal: false,
      show_enroll_status_modal: false
    };
  }

  submitEnrollCourse() {
    if (!this.props.user) {
      // Show require login modal
      this.showRequireLoginModal();
    } else {
      this.props.enrollCourse(this.props.course.id);
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
      categories, course, course_tutor, course_sections, course_comments
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
                  {ObjectUtils.currencyFormat(course.tuition_fee, course.currency)}
                </div>
              ) : null
          }
          <div className={styles.courseActionButtons}>
            <PrimaryButton
              round
              line={false}
              customClasses="full-width"
              callback={this.submitEnrollCourse.bind(this)}
              title={this.context.t('course_enroll')}
            />
          </div>
          <div className={styles.courseShortIntroduce}>
            <div className={styles.itemTitle}>{this.context.t('course_include')}</div>
            <ul>
              <li className={styles.itemInclude}>
                <div className={styles.itemIcon}><CourseAccessIcon width={15} height={15} /></div>
                <div>{this.context.t('account_access_to_course_room')}</div>
              </li>
              <li className={styles.itemInclude}>
                <div className={styles.itemIcon}><CourseMaterialIcon width={15} height={15} /></div>
                <div>{this.context.t('course_material')}</div>
              </li>
              <li className={styles.itemInclude}>
                <div className={styles.itemIcon}><CourseLessonlIcon width={15} height={15} /></div>
                <div>{this.context.t('course_lesson', { numberLesson: course_sections.length })}</div>
              </li>
            </ul>
          </div>
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
};

export default cssModules(CourseDetailAction, styles);
