import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import ObjectUtils from 'utils/ObjectUtils';
import styles from './TutorCourseItem.module.scss';
import SettingIcon from '../../Core/Icons/SettingIcon';
import DetailsIcon from '../../Core/Icons/DetailsIcon';
import ListEnrolledStudent from '../../../containers/Courses/TutorCourse/ListEnrolledStudent';
import {CourseStatus} from '../../../constants/CourseStatus';
import CheckIcon from '../../Core/Icons/CheckIcon';
import DateUtils from '../../../utils/DateUtils';
import CourseItemStatus from './CourseStatus/CourseItemStatus';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import Image from '../../Core/ImageComponent';


class TutorCourseItem extends Component {
  render() {
    const { status } = this.props;
    if ([CourseStatus.PENDING, CourseStatus.REJECTED].indexOf(status) >= 0) {
      return <TutorCourseItemPending {...this.props} />;
    } else if (CourseStatus.APPROVED === status) {
      return <TutorCourseItemApproved {...this.props} />;
    }

    return <TutorCourseItemTeaching {...this.props} />;
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

class TutorCourseItemPending extends Component {
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
    const { course, teachingCourse, activeCourseId } = this.props;
    const alreadyStarted = DateUtils.compareTwoDate(new Date(course.start_date), new Date()) === -1;
    const showEnrolledStudentList = activeCourseId === course.id;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className={`row flex-auto align-items-center ${styles.courseTutorContainer}`}>
            <div className="col-md-5 col-sm-12">
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <div className="d-flex flex-row align-items-center">
                    <a className={styles.courseAvatarImage}><Image src={course.cover_image} /></a>
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
                <div className="col-xl-3 col-lg-2 col-md-2 col-sm-4 max-student-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    {
                      <div className={styles.courseNumberData}>{course.number_of_students}</div>
                    }
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{course.lesson_count}</div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 course-status-col">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={`${styles.courseStatus} ${styles.notStart}`}>
                      <span>{this.context.t(course.status)}</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-4">
                  <div className="d-flex flex-row align-items-center justify-content-right">
                    <div className={styles.leftSeperateLine} />
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

TutorCourseItemPending.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(TutorCourseItemPending, styles);


class TutorCourseItemApproved extends Component {
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

  validateBeforePublishCourse() {
    const { course } = this.props;
    this.props.validateBeforePublishCourse(course);
  }

  render() {
    const { course, teachingCourse, activeCourseId } = this.props;
    const alreadyStarted = DateUtils.compareTwoDate(new Date(course.start_date), new Date()) === -1;
    const showEnrolledStudentList = activeCourseId === course.id;
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
                    <a className={styles.courseAvatarImage}><Image src={course.cover_image} /></a>
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
                <div className="col-xl-3 col-lg-2 col-md-2 col-sm-4">
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.leftSeperateLine} />
                    <div className={styles.courseNumberData}>{course.student_count}/{course.number_of_students || 'NA'}</div>
                  </div>
                </div>
                <div className="col-xl-3 num-lesson-col">
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
                    {
                      course.is_public ? (
                        <CourseItemStatus course={course} teachingCourse={teachingCourse} isStudent={false} {...this.props} />
                      ) : (
                        <PrimaryButton
                          isSmallButton
                          round
                          customClasses="start-course-btn"
                          line={false}
                          title={this.context.t('course_publish')}
                          callback={this.validateBeforePublishCourse.bind(this)}
                        />
                      )
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
      </div>
    );
  }
}

TutorCourseItemApproved.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(TutorCourseItemApproved, styles);

class TutorCourseItemTeaching extends Component {
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
    const { course, teachingCourse, activeCourseId } = this.props;
    const alreadyStarted = DateUtils.compareTwoDate(new Date(course.start_date), new Date()) === -1;
    const showEnrolledStudentList = activeCourseId === course.id;
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
                    <a className={styles.courseAvatarImage}><Image src={course.cover_image} /></a>
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
                      <span>{this.context.t(course.status)}</span>
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

TutorCourseItemTeaching.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(TutorCourseItemTeaching, styles);
