import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorCourseList.module.scss';
import TutorCourseItem from '../CourseItem/TutorCourseItem';
import {CourseStatus} from '../../../constants/CourseStatus';

class TutorCourseList extends Component {
  render() {
    const { courseList, status } = this.props;
    return (
      <div className="row">
        { [CourseStatus.PENDING, CourseStatus.REJECTED].indexOf(status) >= 0 ? <PendingCourseListHeader /> : null }
        {
          CourseStatus.APPROVED === status ? <ApprovedCourseListHeader /> : null
        }
        {
          [CourseStatus.STARTED, CourseStatus.FINISHED].indexOf(status) >= 0 ? <TeachingCourseListHeader /> : null
        }
        <div className="col-md-12">
          <div className="row">
            {
              courseList.map(course => (
                <div className="col-md-12" key={`tutorCourse${course.id}`}>
                  <TutorCourseItem course={course} {...this.props} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

TutorCourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorCourseList.propTypes = {
  // the public course will have some additional feature like following
  courseList: React.PropTypes.array.isRequired
};

export default cssModules(TutorCourseList, styles);

class PendingCourseListHeader extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="row flex-auto pb-10px">
          <div className="col-md-5 col-sm-12">
            <div className="row">
              <div className="col-xl-9 col-sm-12">
                <div className={`${styles.tutorCourseHeader} ${styles.courseName}`}>{this.context.t('course_name')}</div>
              </div>
              <div className="col-xl-3 col-sm-12 course-fee-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_fee')}</div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="row">
              <div className="col-xl-3 col-lg-2 col-md-2 col-sm-4">
                <div className={styles.tutorCourseHeader}>{this.context.t('maximum_student')}</div>
              </div>
              <div className="col-xl-3 col-lg-2 col-sm-4 num-lesson-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('number_lesson')}</div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 course-status-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_status')}</div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-sm-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};


PendingCourseListHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(PendingCourseListHeader, styles);

class ApprovedCourseListHeader extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="row flex-auto pb-10px">
          <div className="col-md-5 col-sm-12">
            <div className="row">
              <div className="col-xl-9 col-sm-12">
                <div className={`${styles.tutorCourseHeader} ${styles.courseName}`}>{this.context.t('course_name')}</div>
              </div>
              <div className="col-xl-3 col-sm-12 course-fee-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_fee')}</div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="row">
              <div className="col-xl-3 col-lg-2 col-md-2 col-sm-4">
                <div className={styles.tutorCourseHeader}>{this.context.t('number_enrolled_student')}</div>
              </div>
              <div className="col-xl-3 col-sm-4 num-lesson-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('number_lesson')}</div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 course-status-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_status')}</div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};


ApprovedCourseListHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(ApprovedCourseListHeader, styles);

class TeachingCourseListHeader extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="row flex-auto pb-10px">
          <div className="col-md-5 col-sm-12">
            <div className="row">
              <div className="col-xl-9 col-sm-12">
                <div className={`${styles.tutorCourseHeader} ${styles.courseName}`}>{this.context.t('course_name')}</div>
              </div>
              <div className="col-xl-3 col-sm-12 course-fee-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_fee')}</div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4">
                <div className={styles.tutorCourseHeader}>{this.context.t('number_enrolled_student')}</div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 max-student-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('start_date')}</div>
              </div>
              <div className="col-xl-2 col-sm-4 num-lesson-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('number_lesson')}</div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-4 col-sm-4 course-status-col">
                <div className={styles.tutorCourseHeader}>{this.context.t('tutor_course_status')}</div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-sm-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};


TeachingCourseListHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
};

cssModules(TeachingCourseListHeader, styles);
