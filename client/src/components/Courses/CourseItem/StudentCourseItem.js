import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import {TT} from 'utils/locale';
import ObjectUtils from 'utils/ObjectUtils';
import DateUtils from 'utils/DateUtils';
import styles from './TutorCourseItem.module.scss';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import SettingIcon from '../../Core/Icons/SettingIcon';
import {CourseStatus} from '../../../constants/CourseStatus';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';
import * as CommonConstant from '../../../utils/CommonConstant';

class StudentCourseItem extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showCourseBillPopup: false,
      popupTitle: '',
      popupMessage: '',
      additionMessages: [],
      acceptCallback: null
    };
  }

  openCourseDetails(courseId) {
    this.props.openCourseDetails(courseId);
  }

  calculateFinalFee(course) {
    if (course.lesson_count === course.period) {
      return course.tuition_fee;
    } else {
      return (course.lesson_count / course.period) * course.tuition_fee + CommonConstant.CANCELATION_FEE;
    }
  }

  showBillOfCoursePopup() {
    this.setState({
      showPopup: false,
      showCourseBillPopup: true
    });
  }

  showStartCourseWarning(course) {
    const courseDetailsLink = '/courses/' + course.id;
    const additionalWarnings = [];
    if (course.status === CourseStatus.STARTED) {
      additionalWarnings.push(this.context.t('cancel_started_course_warning_message'));
    }
    additionalWarnings.push(this.context.t('cancel_started_course_feedback', {
      course_details: <a href={courseDetailsLink}>{this.context.t('cancel_course_details')}</a>,
      coursedy: <a href={`mailto:${this.context.t('product_contact_email')}`}>Coursedy</a>
    }));

    this.setState({
      showPopup: true,
      popupTitle: this.context.t('cancel_course_warning_title'),
      popupMessage: this.context.t('cancel_course_warning_message', { courseName: <strong>{course.title}</strong> }),
      additionMessages: additionalWarnings,
      acceptCallback: () => {
        this.showBillOfCoursePopup();
      }
    });
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  closeBillpopup() {
    this.setState({ showCourseBillPopup: false });
  }

  render() {
    const { course } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className={`row flex-auto align-items-center student-course-item ${styles.courseTutorContainer}`}>
            <div className="col-md-5 col-sm-12" onClick={this.openCourseDetails.bind(this, course.id)}>
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <div className="d-flex flex-row align-items-center">
                    <a className={styles.courseAvatarImage}><img src={course.cover_image} /></a>
                    <div className="d-flex flex-column">
                      <div className={styles.courseTitle}>{course.title}</div>
                      <div className={styles.courseSubTitle}>{course.category.name}</div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-12 d-flex align-items-center course-fee-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={`${styles.courseNumberData} ${styles.fee}`}>
                      {ObjectUtils.currencyFormat(course.tuition_fee, course.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-4 col-md-2 col-sm-4" onClick={this.openCourseDetails.bind(this, course.id)}>
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{DateUtils.formatDate(course.start_date)}</div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 max-student-col" onClick={this.openCourseDetails.bind(this, course.id)}>
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{course.lesson_count}</div>
                  </div>
                </div>
                <div className="col-xl-2 num-lesson-col" onClick={this.openCourseDetails.bind(this, course.id)}>
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{course.lesson_count}</div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 course-status-col"
                     onClick={this.openCourseDetails.bind(this, course.id)}>
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.NOT_STARTED
                        ? <div className={`${styles.courseStatus} ${styles.notStart}`}>{TT.t(course.status)}</div>
                        : course.status === CourseStatus.STARTED
                          ? <div className={`${styles.courseStatus} ${styles.started}`}>{TT.t(course.status)}</div>
                          : <div className={`${styles.courseStatus} ${styles.finished}`}>{TT.t(course.status)}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-4">
                  <div className="d-flex flex-row align-items-center justify-content-right">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.STARTED
                        ? (
                          <PrimaryButton
                            isSmallButton
                            round
                            line={false}
                            customClasses="start-course-btn"
                            callback={this.showStartCourseWarning.bind(this, course)}
                            title={TT.t('cancel_course')}
                          />
                        ) : null
                    }
                    <a className={styles.courseActionButton} onClick={this.openCourseDetails.bind(this, course.id)}>
                      <SettingIcon width={14} height={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimpleDialogComponent
          show={this.state.showPopup}
          title={this.state.popupTitle}
          acceptCallback={this.state.acceptCallback}
          cancelCallback={this.closePopup.bind(this)}
        >
          <div className="d-flex flex-vertical">
            <div>{this.state.popupMessage}</div>
            {
              this.state.additionMessages.map(message => (
                <div className="mt-5">{message}</div>
              ))
            }
          </div>
        </SimpleDialogComponent>
        <SimpleDialogComponent
          show={this.state.showCourseBillPopup}
          title={this.context.t('bill_course_fee_popup_title')}
          acceptCallback={this.props.finishCourse.bind(this, course.id)}
          cancelCallback={this.closeBillpopup.bind(this)}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="billing-course-label">{this.context.t('enrolled_course_details')}:</div>
                </div>
                <div className="col-md-12">{this.context.t('enrolled_course_title', { courseName: <strong>{course.title}</strong> })}</div>
                <div className="col-md-12">{this.context.t('enrolled_course_teacher_name', { teacherName: <strong>{course.user.name}</strong> })}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="seperate-bill-line" />
            </div>
            <div className="col-md-12">
              <div className="billing-course-label">{this.context.t('enrolled_course_billing_details')}:</div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">{this.context.t('number_lesson')}:</div>
                <div className="col-md-6">{course.period}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {this.context.t('number_of_completed_lesson')}
:
                </div>
                <div className="col-md-6">{course.lesson_count}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {this.context.t('cancel_course_fee')}
:
                </div>
                <div className="col-md-6">{ObjectUtils.currencyFormat(CommonConstant.CANCELATION_FEE, course.currency)}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {this.context.t('tutor_course_fee')}
:
                </div>
                <div className="col-md-6">{ObjectUtils.currencyFormat(course.tuition_fee, course.currency)}</div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="seperate-bill-line" />
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  {this.context.t('bill_course_fee_total')}
:
                </div>
                <div className="col-md-6">{ObjectUtils.currencyFormat(this.calculateFinalFee(course), course.currency)}</div>
              </div>
            </div>
          </div>
        </SimpleDialogComponent>
      </div>
    );
  }
}

StudentCourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentCourseItem.propTypes = {
  // the public course will have some additional feature like following
  course: React.PropTypes.object.isRequired,
  finishCourse: React.PropTypes.func,
  openCourseDetails: React.PropTypes.func
};

export default cssModules(StudentCourseItem, styles);
