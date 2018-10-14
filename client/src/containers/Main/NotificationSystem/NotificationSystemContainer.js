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

class NotificationSystemContainer extends Component {
  constructor() {
    super();
    this.newStartCourseHasBeenNotified = [];
  }
  componentWillReceiveProps(nextProps) {
    const { hasActiveCourseToLearn, isJoiningActiveClass, currentUser, stopPolling } = nextProps.session;
    if (hasActiveCourseToLearn && currentUser && !isJoiningActiveClass && !stopPolling) {
      console.log('start polling....');
      this.pollingUpcommingCourse(currentUser);
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

  pollingUpcommingCourse(currentUser) {
    this.timeout = setTimeout(() => {
      const { stopPolling } = this.props.session;
      console.log('fetch upcomming class ---- is polling ' + stopPolling + '  ---  ' + this.timeout);
      if (!stopPolling) {
        this.checkUpcommingCourse(currentUser);
      }
    }, 10000);
  }

  startPolling() {
    const { isJoiningActiveClass } = this.props.session;
    if (!isJoiningActiveClass) {
      this.props.startPolling();
    }
  }

  stopPolling() {
    this.props.stopPolling();
    clearTimeout(this.timeout);
  }

  checkUpcommingCourse(currentUser) {
    if (currentUser.roles.indexOf(UserRole.TEACHER) >= 0) {
      this.props.fetchUpCommingTeacherCourse();
    } else if (currentUser.roles.indexOf(UserRole.STUDENT) >= 0) {
      this.props.fetchUpCommingStudentCourse();
    }
  }

  afterJoiningUpcomingClass(e) {
    console.log('already join to class');
    clearTimeout(this.timeout);
    this.props.afterJoinUpcomingClass();
  }

  acceptJoinToClassRoom(classRoomId) {
    // stop pilling immediately
    this.stopPolling();
    // closed popup
    this.props.closePopupJoinUpcomingClass();
    // joining to bbb room
    Network().get(`rooms/${classRoomId}/join`, {}, true).then((res) => {
      const bbbTab = window.open(res.url, '_blank');
      // join fails because of blocking pop-up
      if (bbbTab === null) {
        const lang = this.props.lang === 'vn' ? 'vi' : 'en';
        const popupBlockerNoti = {
          title: '',
          message: this.context.t('browser_popup_blocker', {
            support_link: <a href={`https://support.google.com/chrome/answer/95472?co=GENIE.Platform%3DDesktop&hl=${lang}`} target='_blank'>{this.context.t('guide_link')}</a>,
            bbb_join_link: <a onClick={(e) => this.afterJoiningUpcomingClass(e)} href={res.url} target="_blank">{this.context.t('bbb_join_again')}</a>
          }),
          position: 'tr',
          onRemove: this.startPolling.bind(this),
          autoDismiss: 0
        }
        this.props.showInfoNotification(popupBlockerNoti);
      } else {
        // executed after joining an active class
        this.props.afterJoinUpcomingClass();
      }
    }, (err) => {
      const roomNotReadyNotif = {
        title: '',
        message: this.context.t('no_bbb_room_ready'),
        position: 'tr',
        autoDismiss: 5,
        onRemove: this.startPolling.bind(this),
      }
      this.props.showInfoNotification(roomNotReadyNotif);
    });
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
    const classRoomId = session.teachingCourse && session.teachingCourse.bigbluebutton_room ? session.teachingCourse.bigbluebutton_room.slug : '';

    if (session.teachingCourse !== null) {
      clearTimeout(this.timeout);
    }
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
          <UpcommingCourseNotificationPopup
            teacherName={teachingCourseTeacherName}
            currentUser={session.currentUser}
            courseName={teachingCourseName}
            courseId={teachingCourseId}
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
  const { main, session, notifications, i18nState } = state;

  return { main, session, notifications, lang: i18nState.lang };
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
