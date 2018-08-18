import React, {Component} from 'react'
import {connect} from "react-redux";
import {StudentCourseActions} from "../../../../actions/index";
import {StudentNavigationTab} from "../../../../constants/StudentNavigationTab";
import * as dashboardActions from "../../../../actions/DashboardMenuActionCreator";
import StudentCourseList from "../../../../components/Courses/CourseList/StudentCourseList";
import {Link} from "react-router-dom";
import {globalHistory} from "utils/globalHistory";

class StudentCoursesEnrollingContainer extends Component {
  componentDidMount() {
    this.props.fetchEnrollingCourseList();
    this.props.activateTab(StudentNavigationTab.ENROLLING_COURSE_LIST);
  }
  render() {
    const {courses, isFetching} = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          {
            courses.length > 0 ? <StudentCourseList {...this.props} courseList={courses}/> : !isFetching ?
              <div className="no-course-warning">
                <span>{this.context.t('no_active_course_message_for_student')}</span>
                <Link className="find-more-course-link" to="/courses">{this.context.t('find_course_link')}</Link>
              </div>: null
          }
        </div>
      </div>
    )
  }
}

StudentCoursesEnrollingContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {StudentCourseListReducer} = state;
  const {
    isFetchingEnrollCourse,
    enrollingCourses
  } = StudentCourseListReducer;
  return { courses: enrollingCourses, isFetching: isFetchingEnrollCourse }
};

const mapDispatchToProps = (dispatch) => ({
  fetchEnrollingCourseList: () => dispatch(StudentCourseActions.fetchListStudentEnrollCourses()),
  finishCourse: (courseId) => dispatch(StudentCourseActions.finishCourse(courseId)),
  openCourseDetails: (courseId) => {
    globalHistory.push(`/courses/${courseId}`)
  },
  activateTab: (tabId) => dispatch(dashboardActions.activateTab(tabId))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(StudentCoursesEnrollingContainer)
