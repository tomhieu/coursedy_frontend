import * as React from "react";
import {Component} from "react";
import CourseList from "../../../components/Courses/CourseList";
import {connect} from "react-redux";
import {fetchListTutorCourse} from "../../../actions/ListTutorCourseActionCreator";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {deleteCourse} from "actions/CourseFormActionCreator";
import {FETCH_TUTOR_COURSES} from "actions/AsyncActionCreator";
import Network from "utils/network";
import {DELETE_COURSE} from "../../../actions/AsyncActionCreator";

class ListTutorCourseContainer extends Component {

  componentDidMount() {
    this.props.fetchListTutorCourse();
  }

  addNewCourses() {
    this.context.router.history.push("/dashboard/courses/new");
  }

  deleteCourse(courseId) {
    this.props.deleteCourse(courseId);
  }

  render() {
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex justify-content-left mb-10">
          <button className="btn btn-link-light"
                  onClick={this.addNewCourses.bind(this)}>{this.context.t('course_add_btn')}</button>
        </div>
        <div className="d-flex flex-auto">
          <LoadingMask placeholderId="tutorCourseListPlaceholder">
            <CourseList
              deleteCourse={this.deleteCourse.bind(this)}
              {...this.props}
              displayMode="grid"
              itemClass='col-xs-12 col-sm-6 col-md-4 mb-15'
              isPublic={false}
            />
          </LoadingMask>
        </div>
      </div>
    )
  }
}

ListTutorCourseContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {TutorCourseList} = state;
  const {courses, isFetching} = TutorCourseList;
  return {
    courses, isFetching
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchListTutorCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('courses'),
    meta: 'tutorCourseListPlaceholder'
  }),
  deleteCourse: (courseId) => dispatch({
    type: DELETE_COURSE,
    payload: Network().delete('courses/' + courseId).then(() => {
      dispatch(fetchListTutorCourse());
    }),
    meta: 'tutorCourseListPlaceholder'
  })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListTutorCourseContainer);