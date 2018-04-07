import React, { Component } from 'react'
import CourseList from "../../../../components/Courses/CourseList";
import {connect} from "react-redux";
import {
  StudentCourseActions
} from "../../../../actions/index";
import LoadingMask from "../../../../components/LoadingMask/LoadingMask";
import {FETCH_STUDENT_FOLLOW_COURSES} from "../../../../actions/AsyncActionCreator";

class StudentCoursesFollowContainer extends Component {
  componentDidMount() {
    this.props.dispatch(StudentCourseActions.fetchListStudentFollowCourses())
  }
  render() {
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <LoadingMask belongingActions={[FETCH_STUDENT_FOLLOW_COURSES]}>
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

StudentCoursesFollowContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {StudentCourseListReducer} = state;
  const {
    isFetchingFollowCourse,
    followCourses
  } = StudentCourseListReducer;
  return { courses: followCourses, isFetching: isFetchingFollowCourse }
};

export default connect(
    mapStateToProps
)(StudentCoursesFollowContainer)
