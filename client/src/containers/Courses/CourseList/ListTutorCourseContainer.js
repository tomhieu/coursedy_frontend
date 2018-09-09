import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { FETCH_TUTOR_COURSES } from 'actions/AsyncActionCreator';
import Network from 'utils/network';
import { globalHistory } from 'utils/globalHistory';
import cssModules from 'react-css-modules';
import LoadingMask from '../../../components/LoadingMask/LoadingMask';
import { DELETE_COURSE, SHOW_ENROLLED_STUDENT_LIST, UPDATE_COURSE } from '../../../actions/AsyncActionCreator';
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';
import { CourseStatus } from '../../../constants/CourseStatus';
import TutorCourseList from '../../../components/Courses/CourseList/TutorCourseList';
import styles from './ListTutorCourseContainer.module.scss';
import { TutorNavigationTab } from '../../../constants/TutorNavigationTab';

class ListTutorCourseContainer extends Component {
  componentWillMount() {
    const { status } = this.props;
    if (status === CourseStatus.STARTED) {
      this.props.activateTab(TutorNavigationTab.ACTIVE_COURSE_LIST);
    } else {
      this.props.activateTab(TutorNavigationTab.COURSE_LIST);
    }
  }

  componentDidMount() {
    const { status } = this.props;
    if (status === CourseStatus.STARTED) {
      this.props.fetchListTutorActiveCourse();
    } else {
      this.props.fetchListTutorCourse();
    }
  }

  openCourseCreation() {
    globalHistory.push('/dashboard/courses/new');
  }

  getNoCourseWarningMessage(courseStatus) {
    if (courseStatus === CourseStatus.STARTED) {
      return this.context.t('no_active_course_message');
    } if (courseStatus === CourseStatus.NOT_STARTED) {
      return this.context.t('no_course_message');
    }
    return '';
  }


  render() {
    const {
      status, courses, isFetching, currentUser
    } = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <div className="title">
            {status === CourseStatus.STARTED ? this.context.t('course_active_list') : this.context.t('course_list')}
          </div>
        </div>
        <div className="d-flex flex-auto">
          <LoadingMask placeholderId="tutorCourseListPlaceholder">
            {
              courses.length > 0 ? <TutorCourseList courseList={courses} {...this.props} /> : !isFetching
                ? (
                  <div className={styles.noCourseWarning}>
                    <span>{this.getNoCourseWarningMessage(status)}</span>
                    {
                    status === CourseStatus.NOT_STARTED ? <a className="active-link ml-5" onClick={this.openCourseCreation.bind(this)}>{this.context.t('search_more_course_link')}</a> : null
                  }
                  </div>
                ) : null
            }
          </LoadingMask>
        </div>
      </div>
    );
  }
}

ListTutorCourseContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { TutorCourseList, session, EnrolledStudentList } = state;
  const { courses, isFetching } = TutorCourseList;
  const { activeCourseId } = EnrolledStudentList;
  const { currentUser } = session;
  const lang = state.i18nState.lang;
  return {
    courses, isFetching, currentUser, activeCourseId, lang
  };
};

const mapDispatchToProps = dispatch => ({
  fetchListTutorCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', { per_page: 100 }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorActiveCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', { per_page: 100, status: CourseStatus.STARTED }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTeachingCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('courses/upcomming_teaching_classes'),
    meta: 'tutorCourseListPlaceholder'
  }),
  deleteCourse: courseId => dispatch({
    type: DELETE_COURSE,
    payload: Network().delete(`courses/${courseId}`).then(() => {
      dispatch(this.fetchListTutorCourse());
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  startCourse: courseId => dispatch({
    type: UPDATE_COURSE,
    payload: Network().update(`courses/${courseId}`, { id: courseId, status: CourseStatus.STARTED })
  }),
  openCourseDetails: (courseId) => {
    globalHistory.push(`/dashboard/courses/detail/${courseId}`);
  },
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  openEnrolledStudentList: courseId => dispatch({
    type: SHOW_ENROLLED_STUDENT_LIST,
    data: courseId
  })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(ListTutorCourseContainer, styles));
