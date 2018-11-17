import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import {TT} from 'utils/locale';
import ObjectUtils from 'utils/ObjectUtils';
import styles from './TutorCourseItem.module.scss';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import SettingIcon from '../../Core/Icons/SettingIcon';
import DetailsIcon from '../../Core/Icons/DetailsIcon';
import ListEnrolledStudent from '../../../containers/Courses/TutorCourse/ListEnrolledStudent';
import {CourseStatus} from '../../../constants/CourseStatus';
import CheckIcon from '../../Core/Icons/CheckIcon';
import StartCourseFormContainer from '../../../containers/Courses/TutorCourse/StartCourseFormContainer';
import DateUtils from '../../../utils/DateUtils';
import CourseItemStatus from './CourseStatus/CourseItemStatus';

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

  openCourseDetails(courseId) {
    this.props.openCourseDetails(courseId);
  }

  render() {
    const { course, teachingCourse} = this.props;
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
                      course.status === CourseStatus.STARTED || course.status === CourseStatus.FINISHED ?
                        <div className={styles.courseNumberData}>{course.student_count}/{course.number_of_students}</div> :
                        <div className={styles.courseNumberData}>{course.student_count}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 max-student-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      course.status === CourseStatus.STARTED || course.status === CourseStatus.FINISHED ?
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
                    <div className={`${styles.courseStatus} ${styles.notStart}`}>
                      <span>{this.context.t(course.verification_status || course.status)}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
                  <div className="d-flex flex-row align-items-center justify-content-right">
                    <div className={styles.leftSeperateLine} />
                    <CourseItemStatus course={course} teachingCourse={teachingCourse} isStudent={false} {...this.props} />
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
  teachingCourse: React.PropTypes.object,
  startCourse: React.PropTypes.func,
  stopCourse: React.PropTypes.func,
  deleteCourse: React.PropTypes.func,
  openCourseDetails: React.PropTypes.func,
  activeCourseId: React.PropTypes.number
};

export default cssModules(TutorCourseItem, styles);
