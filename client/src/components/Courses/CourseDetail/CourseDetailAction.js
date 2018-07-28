import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseDetailAction.module.scss';
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";
import * as Actions from "../../../actions/PublicCourseActionCreator";
import CourseAccessIcon from "../../Core/Icons/CourseAccessIcon";
import CourseMaterialIcon from "../../Core/Icons/CourseMaterialIcon";
import CourseLessonlIcon from "../../Core/Icons/CourseLessonlIcon";
import FacebookIcon from "../../Core/Icons/FacebookIcon";
import GooglePlusIcon from "../../Core/Icons/GooglePlusIcon";
import TwitterIcon from "../../Core/Icons/TwitterIcon";


class CourseDetailAction extends Component {

  constructor() {
    super();
    this.state = {
      show_require_login_modal: false,
      show_enroll_status_modal: false
    }
  }

  submitEnrollCourse() {
    if (!this.props.user) {
      //Show require login modal
      this.showRequireLoginModal();
    } else {
      this.props.dispatch(Actions.submitEnrollCourse(this.props.course.id));
      //Show enroll status modal
      this.showEnrollCourseStatusModal();
    }
  }

  hideRequireLoginModal() {
    this.setState({
      show_require_login_modal: false
    })
  }

  showRequireLoginModal() {
    this.setState({
      show_require_login_modal: true
    })
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(Actions.redirectAfterLogin('course/'+this.props.course.id))
  }

  hideEnrollCourseStatusModal() {
    this.setState({
      show_enroll_status_modal: false
    })
  }

  showEnrollCourseStatusModal() {
    this.setState({
      show_enroll_status_modal: true
    })
  }

  render() {
    const { categories, course, course_tutor, course_sections, course_comments } = this.props;
    return (
      <div className={styles.courseDetailAction}>
        <div className="d-flex flex-column">
          <div className={styles.courseCoverImage}>
            <img src={course.cover_image ? course.cover_image : "http://placehold.it/1366x768"} alt="" />
          </div>
          <div className={styles.courseFee}>
            {course.fee}
          </div>
          <div className={styles.courseActionButtons}>
            <PrimaryButton round={true}
                           line={false}
                           customClasses="full-width"
                           callback={this.submitEnrollCourse.bind(this)}
                           title={this.context.t('course_enroll')}>
            </PrimaryButton>
          </div>
          <div className={styles.courseShortIntroduce}>
            <span>{this.context.t('course_include')}</span>
            <ul>
              <li>
                <div><CourseAccessIcon></CourseAccessIcon></div>
                <div>{this.context.t('account_access_to_course_room')}</div>
              </li>
              <li>
                <div><CourseMaterialIcon></CourseMaterialIcon></div>
                <div>{this.context.t('course_material')}</div>
              </li>
              <li>
                <div><CourseLessonlIcon></CourseLessonlIcon></div>
                <div>{this.context.t('course_lesson', {numberLesson: course_sections.length})}</div>
              </li>
            </ul>
          </div>
          <div className={styles.courseShare}>
            <span className={styles.title}>{this.context.t('share_course_with_friend')}</span>
            <div className="d-flex flex-row">
              <a className={styles.socialNetwork}><FacebookIcon></FacebookIcon></a>
              <a className={styles.socialNetwork}><GooglePlusIcon></GooglePlusIcon></a>
              <a className={styles.socialNetwork}><TwitterIcon></TwitterIcon></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CourseDetailAction.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailAction.propTypes = {
};

export default cssModules(CourseDetailAction, styles);