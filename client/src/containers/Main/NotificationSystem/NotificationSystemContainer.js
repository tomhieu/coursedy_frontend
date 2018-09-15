import * as React from 'react';
import {Component} from 'react';
import Notifications, {success} from 'react-notification-system-redux';
import {Link} from 'react-router-dom';
import DateUtils from 'utils/DateUtils';
import {connect} from 'react-redux';
import UpcommingCourseNotificationPopup from '../../../components/Layout/UpcommingCoursePopup/UpcommingCourseNotificationPopup';
import {
  CLOSE_POPUP_JOIN_UPCOMMING_CLASS,
  LEAVED_JOINING_CLASS,
  STARTED_JOINING_ACTIVE_CLASS
} from '../../../actions/AsyncActionCreator';
import * as courseActions from '../../../actions/ListTutorCourseActionCreator';
import {joinToClassRoom} from '../../../actions/ListTutorCourseActionCreator';
import {UserRole} from '../../../constants/UserRole';

class NotificationSystemContainer extends Component {
  constructor() {
    super();
    this.newStartCourseHasBeenNotified = [];
  }
  componentWillReceiveProps(nextProps) {
    const { hasActiveCourseToLearn, isJoiningActiveClass, currentUser } = nextProps.session;
    if (hasActiveCourseToLearn && currentUser && !isJoiningActiveClass) {
      this.startPoll(currentUser);
    } else {
      clearTimeout(this.timeout);
    }
  }

  componentDidMount() {
    const { session } = this.props;
    if (!session.hasActiveCourseToLearn) {
      return;
    }

    this.checkUpcommingCourse(session.currentUser);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  startPoll(currentUser) {
    this.timeout = setTimeout(() => {
      this.checkUpcommingCourse(currentUser);
    }, 200000);
  }

  checkUpcommingCourse(currentUser) {
    if (currentUser.roles.indexOf(UserRole.TEACHER) >= 0) {
      this.props.fetchUpCommingTeacherCourse();
    } else if (currentUser.roles.indexOf(UserRole.STUDENT) >= 0) {
      this.props.fetchUpCommingStudentCourse();
    }
  }

  acceptJoinToClassRoom(classRoomId) {
    clearTimeout(this.timeout);
    // closed popup
    this.props.closePopupJoinUpcomingClass();
    // join to class
    joinToClassRoom(classRoomId);
    // executed after joining an active class
    this.props.afterJoinUpcomingClass();
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
    const { main, session, notifications } = this.props;

    // get new started courses
    const { newStartedCourses } = session;

    const teachingCourseTeacherName = session.teachingCourse !== null ? session.teachingCourse.user.name : '';
    const teachingCourseName = session.teachingCourse !== null ? session.teachingCourse.title : '';
    const teachingCourseId = session.teachingCourse !== null ? session.teachingCourse.id : '';
    const classRoomId = session.teachingCourse !== null ? session.teachingCourse.bigbluebutton_room.slug : '';

    // show notification about the new started course
    const newStartedCourseNeedToNotify = newStartedCourses.filter(nc => this.newStartCourseHasBeenNotified.indexOf(nc.id) < 0);
    if (newStartedCourseNeedToNotify.length > 0) {
      const newStartedCourseNotification = newStartedCourseNeedToNotify.map(course => ({
        title: this.context.t('new_started_course_notification_title'),
        message: this.context.t('new_started_course_notification_message', {
          courseName: <Link
            to={this.getCourseDetailsUrl(course.id)}
            className="link-course-details"
          >
            {course.title}
          </Link>,
          firstDayLearning: <strong>{DateUtils.formatDate(course.start_date)}</strong>
        }),
        position: 'tr',
        autoDismiss: 0,
        id: course.id
      }));

      this.newStartCourseHasBeenNotified.push(...newStartedCourses.map(c => c.id));
      this.notifyNewStartedCourse(newStartedCourseNotification);

    }
    return (
      <div>
        <div className="join-course">
          <UpcommingCourseNotificationPopup
            teacherName={teachingCourseTeacherName}
            currentUser={session.currentUser}
            courseName={teachingCourseName}
            courseId={teachingCourseId}
            isShowPopup={session.teachingCourse !== null}
            classRoomId={classRoomId}
            acceptJoinToClassRoom={this.acceptJoinToClassRoom.bind(this)}
            closePopupJoinUpcomingClass={this.props.closePopupJoinUpcomingClass.bind(this)}
          />
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
  const { main, session, notifications } = state;

  return { main, session, notifications };
};

const mapDispatchToProps = dispatch => ({
  closePopupJoinUpcomingClass: () => dispatch({ type: CLOSE_POPUP_JOIN_UPCOMMING_CLASS }),
  fetchUpCommingTeacherCourse: () => dispatch(courseActions.fetchUpcomingTutorCourse()),
  fetchUpCommingStudentCourse: () => dispatch(courseActions.fetchUpcomingStudentCourse()),
  afterJoinUpcomingClass: () => dispatch({ type: STARTED_JOINING_ACTIVE_CLASS }),
  afterLeavedActiveClass: () => dispatch({ type: LEAVED_JOINING_CLASS }),
  showInfoNotification: (notification) => dispatch(success(notification)),
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(NotificationSystemContainer);
