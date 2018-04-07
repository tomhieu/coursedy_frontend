import React, { Component } from 'react'
import CourseList from "../../../../components/Courses/CourseList";
import {connect} from "react-redux";
import {
  StudentCourseActions
} from "../../../../actions/index";
import LoadingMask from "../../../../components/LoadingMask/LoadingMask";
import {FETCH_STUDENT_ENROLL_COURSES} from "../../../../actions/AsyncActionCreator";

class StudentCoursesEnrolledContainer extends Component {
  componentDidMount() {
    this.props.dispatch(StudentCourseActions.fetchListStudentEnrollCourses())
  }
  render() {
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <LoadingMask belongingActions={[FETCH_STUDENT_ENROLL_COURSES]}>
            <CourseList 
              {...this.props} 
              displayMode="grid" 
              itemPerRowInGridMode={2}
              isPublic={false}
              fullHeight={true}
            />
          </LoadingMask>
        </div>
      </div>
    )
  }
}

StudentCoursesEnrolledContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {StudentCourseListReducer} = state;
  const {
    isFetchingEnrollCourse,
    enrolledCourses
  } = StudentCourseListReducer;
  return { courses: enrolledCourses, isFetching: isFetchingEnrollCourse }
};

export default connect(
    mapStateToProps
)(StudentCoursesEnrolledContainer)