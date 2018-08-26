import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseList from '../../../../components/Courses/CourseList';
import {
  StudentCourseActions
} from '../../../../actions/index';
import LoadingMask from '../../../../components/LoadingMask/LoadingMask';
import { FETCH_STUDENT_ENROLL_COURSES } from '../../../../actions/AsyncActionCreator';
import { StudentNavigationTab } from '../../../../constants/StudentNavigationTab';
import * as dashboardActions from '../../../../actions/DashboardMenuActionCreator';
import StudentCourseList from '../../../../components/Courses/CourseList/StudentCourseList';

class StudentCoursesEnrolledContainer extends Component {
  componentDidMount() {
    this.props.fetchEnrolledCourseList();
    this.props.activateTab(StudentNavigationTab.ENROLLED_COURSE_LIST);
  }

  render() {
    const { courses, isFetching } = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <LoadingMask belongingActions={[FETCH_STUDENT_ENROLL_COURSES]}>
            {
              courses.length > 0 ? <StudentCourseList {...this.props} courseList={courses} /> : !isFetching
                ? (
                  <div className="no-course-warning">
                    <span>{this.context.t('no_finished_course_message_for_student')}</span>
                  </div>
                ) : null
            }
          </LoadingMask>
        </div>
      </div>
    );
  }
}

StudentCoursesEnrolledContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { StudentCourseListReducer } = state;
  const {
    isFetchingEnrollCourse,
    enrolledCourses
  } = StudentCourseListReducer;
  return { courses: enrolledCourses, isFetching: isFetchingEnrollCourse };
};

const mapDispatchToProps = dispatch => ({
  fetchEnrolledCourseList: () => dispatch(StudentCourseActions.fetchListStudentEnrollCourses()),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentCoursesEnrolledContainer);
