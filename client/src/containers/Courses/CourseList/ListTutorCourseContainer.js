import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { FETCH_TUTOR_COURSES } from 'actions/AsyncActionCreator';
import Network from 'utils/network';
import { globalHistory } from 'utils/globalHistory';
import cssModules from 'react-css-modules';
import LoadingMask from '../../LoadingMask/LoadingMask';
import {
  DELETE_COURSE, FINISH_LESSON, SHOW_ENROLLED_STUDENT_LIST,
  UPDATE_COURSE
} from '../../../actions/AsyncActionCreator';
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';
import { CourseStatus } from '../../../constants/CourseStatus';
import TutorCourseList from '../../../components/Courses/CourseList/TutorCourseList';
import styles from './ListTutorCourseContainer.module.scss';
import { TutorNavigationTab } from '../../../constants/TutorNavigationTab';
import {openConfirmationPopup} from '../../../actions/MainActionCreator';
import {joinToBBBRoom} from '../../../actions/Bigbluebutton/BigbluebuttonActionCreator';
import {LessonStatus} from '../../../constants/LessonStatus';
import * as CourseActions from '../../../actions/CourseFormActionCreator';
import * as AsynActions from '../../../actions/AsyncActionCreator';
import { PublicCourseModal } from '../CourseForm/CourseFormContainer';

class ListTutorCourseContainer extends Component {
  componentWillMount() {
    const { status } = this.props;
    if (status === CourseStatus.PENDING) {
      this.props.activateTab(TutorNavigationTab.PENDING_COURSE_LIST);
    } else if (status === CourseStatus.APPROVED) {
      this.props.activateTab(TutorNavigationTab.APPROVED_COURSE_LIST);
    } else if (status === CourseStatus.REJECTED) {
      this.props.activateTab(TutorNavigationTab.REJECTED_COURSE_LIST);
    } else if (status === CourseStatus.STARTED) {
      this.props.activateTab(TutorNavigationTab.STARTED_COURSE_LIST);
    } else {
      this.props.activateTab(TutorNavigationTab.FINISHED_COURSE_LIST);
    }
  }

  componentDidMount() {
    const { status } = this.props;
    this.fetchCourseList(status);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      const { status } = nextProps;
      this.fetchCourseList(status);
    }
  }

  fetchCourseList(status) {
    if (status === CourseStatus.PENDING) {
      this.props.fetchListTutorPendingCourse();
    } else if (status === CourseStatus.APPROVED) {
      this.props.fetchListTutorApprovedCourse();
    } else if (status === CourseStatus.REJECTED) {
      this.props.fetchListTutorRejectedCourse();
    } if (status === CourseStatus.STARTED) {
      this.props.fetchListTutorActiveCourse();
    } else if (status === CourseStatus.FINISHED) {
      this.props.fetchListTutorFinishedCourse();
    }
  }

  openCourseCreation() {
    globalHistory.push('/dashboard/courses/new');
  }

  getNoCourseWarningMessage(courseStatus) {
    if (courseStatus === CourseStatus.PENDING) {
      return this.context.t('no_pending_course_message');
    } else if (courseStatus === CourseStatus.APPROVED) {
      return this.context.t('no_approved_course_message');
    } else if (courseStatus === CourseStatus.REJECTED) {
      return this.context.t('no_rejected_course_message');
    } else if (courseStatus === CourseStatus.STARTED) {
      return this.context.t('no_teaching_course_message');
    }
    return this.context.t('no_finished_course_message');
  }

  reJoinToBBBroom(classRoomId, lessonId, afterJoining) {
    const { lang } = this.props.lang;
    this.props.joinToBBBRoom(classRoomId, lessonId, this.context, lang, afterJoining, this.props.fetchListTutorActiveCourse.bind(this));
  }

  /* begin public course func */
  publishCourse() {
    this.props.doPublishCourse(this.props.courseData.id);
    this.cancelPublishCourse();
  }

  cancelPublishCourse() {
    this.props.cancelPublishCourse();
  }
  /* end public course func */

  render() {
    const {
      status, courses, isFetching
    } = this.props;
    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-auto">
          <div className="title">
            { status === CourseStatus.PENDING && this.context.t('pending_course_list_title')}
            { status === CourseStatus.APPROVED && this.context.t('approved_course_list_title')}
            { status === CourseStatus.REJECTED && this.context.t('rejected_course_list_title')}
            { status === CourseStatus.STARTED && this.context.t('teaching_course_list_title')}
            { status === CourseStatus.FINISHED && this.context.t('finished_course_list_title')}
          </div>
        </div>
        <div className="d-flex flex-auto">
          <LoadingMask placeholderId="tutorCourseListPlaceholder">
            {
              courses.length > 0 ? <TutorCourseList courseList={courses} reJoinToBBBRoom={this.reJoinToBBBroom.bind(this)} {...this.props} /> : !isFetching
                ? (
                  <div className={styles.noCourseWarning}>
                    <span>{this.getNoCourseWarningMessage(status)}</span>
                    {
                      status === CourseStatus.PENDING ? <a className="active-link ml-5" onClick={this.openCourseCreation.bind(this)}>{this.context.t('search_more_course_link')}</a> : null
                    }
                  </div>
                ) : null
            }
          </LoadingMask>
        </div>
        <PublicCourseModal
          show={this.props.publishCourse}
          publishCourse={this.publishCourse.bind(this)}
          cancelPublishCourse={this.cancelPublishCourse.bind(this)}
          courseTitle={this.props.courseData.title}
          listSection={this.props.listSection}
        />
      </div>
    );
  }
}

ListTutorCourseContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state) => {
  const { TutorCourseList: TutorCourseListState, session, EnrolledStudentList } = state;
  const { courses, isFetching } = TutorCourseListState;
  const { activeCourseId } = EnrolledStudentList;
  const { currentUser, teachingCourse } = session;
  const { lang } = state.i18nState;
  const {
    publishCourse,
    courseData
  } = state.courseDetails;
  const listSection = courseData.lessons || [];
  return {
    courses,
    isFetching,
    currentUser,
    activeCourseId,
    lang,
    teachingCourse,
    listSection,
    publishCourse,
    courseData
  };
};

const mapDispatchToProps = dispatch => ({
  fetchListTutorCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', { per_page: 100, status: CourseStatus.NOT_STARTED }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorPendingCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {
      per_page: 100,
      verification_status: CourseStatus.PENDING,
      status: CourseStatus.NOT_STARTED
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorApprovedCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {
      per_page: 100,
      verification_status: CourseStatus.APPROVED,
      status: CourseStatus.NOT_STARTED
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorRejectedCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {
      per_page: 100,
      verification_status: CourseStatus.REJECTED
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorActiveCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {
      per_page: 100,
      verification_status: CourseStatus.APPROVED,
      status: CourseStatus.STARTED
    }),
    meta: 'tutorCourseListPlaceholder'
  }),
  fetchListTutorFinishedCourse: () => dispatch({
    type: FETCH_TUTOR_COURSES,
    payload: Network().get('users/courses', {
      per_page: 100,
      verification_status: CourseStatus.APPROVED,
      status: CourseStatus.FINISHED
    }),
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
  startCourse: (courseId, startDate) => dispatch({
    type: UPDATE_COURSE,
    payload: Network().update(`courses/${courseId}`, {
      ...startDate,
      id: courseId,
      status: CourseStatus.STARTED
    })
  }),
  stopCourse: (courseId, startDate) => dispatch({
    type: UPDATE_COURSE,
    payload: Network().update(`courses/${courseId}`, {
      ...startDate,
      id: courseId,
      status: CourseStatus.NOT_STARTED
    })
  }),
  openCourseDetails: (courseId) => {
    globalHistory.push(`/dashboard/courses/detail/${courseId}`);
  },
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  openEnrolledStudentList: courseId => dispatch({
    type: SHOW_ENROLLED_STUDENT_LIST,
    data: courseId
  }),
  openConfirmationPopup: (popupTitle, popupMessage, acceptCallback) => dispatch(openConfirmationPopup(popupTitle, popupMessage, acceptCallback)),
  joinToBBBRoom: (classRoomId, lessonId, context, lang, onRemoveNotification, afterJoinCallback) => dispatch(joinToBBBRoom(classRoomId, lessonId, context, lang, onRemoveNotification, afterJoinCallback)),
  terminateLesson: lessonId => {
    const res = dispatch({
      type: FINISH_LESSON,
      payload: Network().update(`lessons/${lessonId}`, {
        id: lessonId,
        status: LessonStatus.FINISH
      })
    });

    res.then(() => {
      this.fetchListTutorActiveCourse();
    });
  },
  validateBeforePublishCourse: (course) => dispatch(CourseActions.validateBeforePublishCourse(course)),
  doPublishCourse: courseId => dispatch(CourseActions.publishCourse(courseId)),
  cancelPublishCourse: () => dispatch({ type: AsynActions.CANCEL_PUBLISH_COURSE }),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(ListTutorCourseContainer, styles));
