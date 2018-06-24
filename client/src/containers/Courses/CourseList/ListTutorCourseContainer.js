import * as React from "react";
import {Component} from "react";
import CourseList from "../../../components/Courses/CourseList";
import {connect} from "react-redux";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {FETCH_TUTOR_COURSES} from "actions/AsyncActionCreator";
import Network from "utils/network";
import {DELETE_COURSE} from "../../../actions/AsyncActionCreator";
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';
import {CourseStatus} from "../../../constants/CourseStatus";

class ListTutorCourseContainer extends Component {

  componentWillMount() {
    const {status} = this.props;
    if (status === 'active') {
      this.props.activateTab('course_active_list');
    } else {
      this.props.activateTab('course_list');
    }
  }

  componentDidMount() {
    const {status} = this.props;
    if (status === 'active') {
      this.props.fetchListTutorActiveCourse();
    } else {
      this.props.fetchListTutorCourse();
    }
  }

  deleteCourse(courseId) {
    this.props.deleteCourse(courseId);
  }

  render() {
    const {status} = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <div className="title">
            {status === CourseStatus.ACTIVE ? this.context.t('course_active_list') : this.context.t('course_list')}
          </div>
        </div>
        <div className="d-flex flex-auto">
          <LoadingMask placeholderId="tutorCourseListPlaceholder">
            <CourseList
              deleteCourse={this.deleteCourse.bind(this)}
              {...this.props}
              displayMode="grid"
              itemClass='col-xs-12 col-sm-6 col-md-4 col-lg-2 mb-15'
              isPublic={false}
              courseStatus={status}
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
    payload: Network().get('users/courses', {per_page: 100}),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorActiveCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {per_page: 100}),
    meta: 'tutorCourseListPlaceholder'
  }),
  deleteCourse: (courseId) => dispatch({
    type: DELETE_COURSE,
    payload: Network().delete('courses/' + courseId).then(() => {
      dispatch(this.fetchListTutorCourse());
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  activateTab: (tabId) => dispatch(dashboardActions.activateTab(tabId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListTutorCourseContainer);