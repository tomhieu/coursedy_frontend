import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import {TT} from 'utils/locale';
import ObjectUtils from 'utils/ObjectUtils';
import styles from './TutorCourseItem.module.scss';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import TrashIcon from '../../Core/Icons/TrashIcon';
import SettingIcon from '../../Core/Icons/SettingIcon';
import DetailsIcon from '../../Core/Icons/DetailsIcon';
import ListEnrolledStudent from '../../../containers/Courses/TutorCourse/ListEnrolledStudent';
import {CourseStatus} from '../../../constants/CourseStatus';
import CheckIcon from '../../Core/Icons/CheckIcon';
import StartCourseFormContainer from '../../../containers/Courses/TutorCourse/StartCourseFormContainer';
import DateUtils from '../../../utils/DateUtils';

class TutorCourseItem extends Component {
  constructor() {
    super();
    this.state = {
      showStudentList: false,
      showPopup: false,
      popupTitle: '',
      popupMessage: '',
      acceptCallback: null
    };
  }

  showEnrolledStudentList(courseId) {
    this.props.openEnrolledStudentList(courseId);
  }

  stopTeachingCourse(course) {
    const res = this.props.stopCourse(course.id);
    res.then((r2) => {
      this.props.fetchListTutorActiveCourse();
    });
  }

  openConfirmationBeforeStopTeaching(course) {
    this.props.openConfirmationPopup(this.context.t('stop_teaching_course_title'),
      this.context.t('stop_teaching_course_message', {
        course_title: <strong>{course.title}</strong>
      }), this.stopTeachingCourse.bind(this, course));
  }

  openCourseDetails(courseId) {
    this.props.openCourseDetails(courseId);
  }

  showDeleteWarning(course) {
    this.setState({
      showPopup: true,
      popupTitle: this.context.t('alert_popup'),
      popupMessage: this.context.t('delete_course_warning_message', { courseName: course.title }),
      acceptCallback: () => {
        this.props.deleteCourse(course.id);
      }
    });
  }

  showStartCourseWarning(course) {
    this.setState({
      showPopup: true,
      acceptCallback: (startDate) => {
        this.props.startCourse(course.id, startDate);
      }
    });
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  startTeachingCourse(startDate) {
    this.closePopup();
    const response = this.props.startCourse(this.props.course.id, startDate);
    response.then(res => {
      this.props.fetchListTutorCourse();
    });
  }

  render() {
    const { course} = this.props;
    const alreadyStarted = DateUtils.compareTwoDate(new Date(course.start_date), new Date()) === -1;
    const showEnrolledStudentList = this.props.activeCourseId === course.id;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className={`row flex-auto align-items-center ${styles.courseTutorContainer}`}>
            <div className="col-md-5 col-sm-12">
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <div className="d-flex flex-row align-items-center">
                    <a onClick={this.showEnrolledStudentList.bind(this, course.id)} className={styles.courseNavIcon}>
                      {
                        showEnrolledStudentList ? <CheckIcon isActive width={18} height={11} /> : <DetailsIcon />
                      }
                    </a>
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
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.STARTED ?
                        <div className={styles.courseNumberData}>{course.student_count}/{course.number_of_students}</div> :
                        <div className={styles.courseNumberData}>{course.student_count}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 max-student-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.STARTED ?
                        <div className={styles.courseNumberData}>{DateUtils.formatDate(course.start_date)}</div> :
                        <div className={styles.courseNumberData}>{course.number_of_students}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-2 num-lesson-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{course.lesson_count}</div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 course-status-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.NOT_STARTED
                        ? <div className={`${styles.courseStatus} ${styles.notStart}`}>{TT.changeLocale(this.props.lang).t(course.status)}</div>
                        : course.status === CourseStatus.STARTED
                          ? <div className={`${styles.courseStatus} ${styles.started}`}>{TT.changeLocale(this.props.lang).t(course.status)}</div>
                          : <div className={`${styles.courseStatus} ${styles.finished}`}>{TT.changeLocale(this.props.lang).t(course.status)}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
                  <div className="d-flex flex-row align-items-center justify-content-right">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.NOT_STARTED ?
                        <PrimaryButton
                          isSmallButton
                          round
                          line={false}
                          customClasses="start-course-btn"
                          callback={this.showStartCourseWarning.bind(this, course)}
                          title={TT.changeLocale(this.props.lang).t('start_course')}
                        /> : course.status === CourseStatus.STARTED && !alreadyStarted ?
                        <PrimaryButton
                          isSmallButton
                          round
                          line={false}
                          customClasses="start-course-btn"
                          callback={this.openConfirmationBeforeStopTeaching.bind(this, course)}
                          title={TT.changeLocale(this.props.lang).t('stop_course')}
                        /> : null
                    }
                    {
                      course.status === CourseStatus.NOT_STARTED ?
                        <a className={styles.courseActionButton} onClick={this.showDeleteWarning.bind(this, course)}>
                          <TrashIcon width={11} height={21} />
                        </a> : null
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
        {
          showEnrolledStudentList ?
            <div className="list-enrolled-student col-md-12">
              <ListEnrolledStudent courseId={course.id} />
            </div> : null
        }
        <StartCourseFormContainer show={this.state.showPopup}
                                  acceptCallback={this.state.acceptCallback}
                                  onSubmit={this.startTeachingCourse.bind(this)}
                                  cancelCallback={this.closePopup.bind(this)}
                                  {...this.props}>
        </StartCourseFormContainer>


      </div>
    );
  }
}

TutorCourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorCourseItem.propTypes = {
  // the public course will have some additional feature like following
  course: React.PropTypes.object.isRequired,
  startCourse: React.PropTypes.func,
  stopCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
  openCourseDetails: React.PropTypes.func,
  activeCourseId: React.PropTypes.number
};

export default cssModules(TutorCourseItem, styles);
