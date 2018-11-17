import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/es/Link';
import CourseList from '../../../../components/Courses/CourseList';
import {
  StudentCourseActions
} from '../../../../actions/index';
import LoadingMask from '../../../LoadingMask/LoadingMask';
import { FETCH_STUDENT_FOLLOW_COURSES } from '../../../../actions/AsyncActionCreator';
import { StudentNavigationTab } from '../../../../constants/StudentNavigationTab';
import * as dashboardActions from '../../../../actions/DashboardMenuActionCreator';
import StudentCourseList from '../../../../components/Courses/CourseList/StudentCourseList';

class StudentCoursesFollowContainer extends Component {
  componentDidMount() {
    this.props.fetchFollowingCourseList();
    this.props.activateTab(StudentNavigationTab.FOLLOWING_COURSE_LIST);
  }

  render() {
    const { courses, isFetching } = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <LoadingMask belongingActions={[FETCH_STUDENT_FOLLOW_COURSES]} placeholderId="studenEnrolledCourseListPlaceholder">
            {
              courses.length > 0 ? <StudentCourseList {...this.props} courseList={courses} /> : !isFetching
                ? (
                  <div className="no-course-warning">
                    <span>{this.context.t('no_following_course_message_for_student')}</span>
                    <Link className="find-more-course-link" to="/courses">{this.context.t('find_course_link')}</Link>
                  </div>
                ) : null
            }
          </LoadingMask>
        </div>
      </div>
    );
  }
}

StudentCoursesFollowContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { StudentCourseListReducer } = state;
  const {
    isFetchingFollowCourse,
    followCourses
  } = StudentCourseListReducer;
  return { courses: followCourses, isFetching: isFetchingFollowCourse };
};

const mapDispatchToProps = dispatch => ({
  fetchFollowingCourseList: () => dispatch(StudentCourseActions.fetchListStudentFollowCourses()),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentCoursesFollowContainer);
