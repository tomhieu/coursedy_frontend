import * as React from 'react';
import {Component} from 'react';
import Notifications, {success} from 'react-notification-system-redux';
import {Link} from 'react-router-dom';
import DateUtils from 'utils/DateUtils';
import {connect} from 'react-redux';
import UpcommingCourseNotificationPopup from '../../../components/Layout/UpcommingCoursePopup/UpcommingCourseNotificationPopup';
import {
  CLOSE_POPUP_JOIN_UPCOMMING_CLASS,
  LEAVED_JOINING_CLASS, START_POLLING_UPCOMMING_COURSE,
  STARTED_JOINING_ACTIVE_CLASS, STOP_POLLING_UPCOMMING_COURSE
} from '../../../actions/AsyncActionCreator';
import * as courseActions from '../../../actions/ListTutorCourseActionCreator';
import {UserRole} from '../../../constants/UserRole';
import Network from '../../../utils/network';
import FormDialogContainer from '../../Dialog/FormDialogContainer';
import LearningNotificationPopupContainer from '../BBB/LearningNotificationPopupContainer';
import {joinToBBBRoom} from '../../../actions/Bigbluebutton/BigbluebuttonActionCreator';

class NotificationSystemContainer extends Component {
  constructor() {
    super();
    this.newStartCourseHasBeenNotified = [];
    this.isFetchingUpCommingCourse = false;
  }

  componentWillReceiveProps(nextProps) {
    const { hasActiveCourseToLearn, isJoiningActiveClass, currentUser, stopPolling } = nextProps.session;
    if (hasActiveCourseToLearn && currentUser && !isJoiningActiveClass && !stopPolling) {
      this.pollingUpcommingCourse(stopPolling, currentUser, 10000);
    }
  }

  componentDidMount() {
    const { session } = this.props;
    if (!session.hasActiveCourseToLearn) {
      return;
    }
    this.pollingUpcommingCourse(session.stopPolling, session.currentUser);
  }

  pollingUpcommingCourse(stopPolling, currentUser, timeOut = 0) {
    if (!this.isFetchingUpCommingCourse) {
      this.isFetchingUpCommingCourse = true;
      if (!stopPolling) {
        console.log('start polling...')
        setTimeout(() => {
          console.log('fetch upcomming class ---- is polling ' + stopPolling);
          this.checkUpcommingCourse(currentUser).finally(() => {
            this.isFetchingUpCommingCourse = false;
          });
        }, timeOut);
      }
    }
  }

  startPolling() {
    const { isJoiningActiveClass } = this.props.session;
    if (!isJoiningActiveClass) {
      this.props.startPolling();
    }
  }

  stopPolling() {
    this.props.stopPolling();
  }

  checkUpcommingCourse(currentUser) {
    if (currentUser.roles.indexOf(UserRole.TEACHER) >= 0) {
      return this.props.fetchUpCommingTeacherCourse();
    } else if (currentUser.roles.indexOf(UserRole.STUDENT) >= 0) {
      return this.props.fetchUpCommingStudentCourse();
    }
  }

  afterJoiningUpcomingClass(e) {
    console.log('already join to class');
    this.props.afterJoinUpcomingClass();
  }

  acceptJoinToClassRoom(formValue) {
    // stop pilling immediately
    this.stopPolling();
    // closed popup
    this.props.closePopupJoinUpcomingClass();
    // joining to bbb room
    const {teachingCourse} = this.props.session;
    const classRoomId = teachingCourse && teachingCourse.bigbluebutton_room ? teachingCourse.bigbluebutton_room.slug : '';
    const lessonId = formValue.selectedLesson;

    joinToBBBRoom(classRoomId, lessonId, this.startPolling.bind(this));
  }

  showNotification(notification, timeout) {
    setTimeout(() => {
      this.props.showInfoNotification(notification);
    }, timeout);
  }

  notifyNewStartedCourse(notificationOpts) {
    notificationOpts.map((notification, index) => {
      this.showNotification(notification, 250 + index * 20);
    });
  }

  getCourseDetailsUrl(courseId) {
    return `/courses/${courseId}`;
  }

  render() {
    const { main, session, notifications, handleSubmit } = this.props;

    // get new started courses
    const { newStartedCourses } = session;

    const classRoomId = session.teachingCourse && session.teachingCourse.bigbluebutton_room ? session.teachingCourse.bigbluebutton_room.slug : '';
    // show notification about the new started course
    const newStartedCourseNeedToNotify = newStartedCourses.filter(nc => this.newStartCourseHasBeenNotified.indexOf(nc.id) < 0);
    if (newStartedCourseNeedToNotify.length > 0) {
      const newStartedCourseNotification = newStartedCourseNeedToNotify.map(course => ({
        title: this.context.t('new_started_course_notification_title'),
        message: this.context.t('new_started_course_notification_message', {
          courseName: <Link to={this.getCourseDetailsUrl(course.id)} className="link-course-details">
            {course.title}
          </Link>,
          firstDayLearning: <strong>{DateUtils.formatDate(course.start_date)}</strong>
        }),
        position: 'tr',
        autoDismiss: 1,
        id: course.id
      }));

      this.newStartCourseHasBeenNotified.push(...newStartedCourses.map(c => c.id));
      this.notifyNewStartedCourse(newStartedCourseNotification);
    }
    if (classRoomId === '') {
      return <Notifications notifications={notifications} />;
    }
    return (
      <div>
        <div className="join-course">
          <LearningNotificationPopupContainer course={session.teachingCourse}
                                              currentUser={session.currentUser}
                                              onSubmit={this.acceptJoinToClassRoom.bind(this)}
                                              closePopupJoinUpcomingClass={this.props.closePopupJoinUpcomingClass.bind(this)}
                                              acceptJoinToClassRoom={this.acceptJoinToClassRoom.bind(this)}>
          </LearningNotificationPopupContainer>
        </div>
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

NotificationSystemContainer.propTypes = {
  notifications: React.PropTypes.array,
  newStartedCourses: React.PropTypes.array
};


NotificationSystemContainer.contextTypes = {
  t: React.PropTypes.func
};

const mapStateToProps = (state) => {
  const {
    main, session, notifications, i18nState
  } = state;

  return {
    main, session, notifications, lang: i18nState.lang
  };
};

const mapDispatchToProps = dispatch => ({
  closePopupJoinUpcomingClass: () => dispatch({ type: CLOSE_POPUP_JOIN_UPCOMMING_CLASS }),
  fetchUpCommingTeacherCourse: () => dispatch(courseActions.fetchUpcomingTutorCourse()),
  fetchUpCommingStudentCourse: () => dispatch(courseActions.fetchUpcomingStudentCourse()),
  afterJoinUpcomingClass: () => dispatch({ type: STARTED_JOINING_ACTIVE_CLASS }),
  afterLeavedActiveClass: () => dispatch({ type: LEAVED_JOINING_CLASS }),
  showInfoNotification: (notification) => dispatch(success(notification)),
  stopPolling: (notification) => dispatch({ type: STOP_POLLING_UPCOMMING_COURSE }),
  startPolling: (notification) => dispatch({ type: START_POLLING_UPCOMMING_COURSE }),
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(NotificationSystemContainer);
