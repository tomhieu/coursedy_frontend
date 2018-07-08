import {Component} from "react";
import * as React from "react";
import Notifications from "react-notification-system-redux";
import {Link} from "react-router-dom";
import DateUtils from "utils/DateUtils";

class NotificationSystemComponent extends Component {

  constructor() {
    super();
    this.state = {
      showNotification: true
    }
  }

  showNotification(notification, timeout) {
    setTimeout(() => {
      this.props.showInfoNotification(notification)
    }, timeout);
  }

  notifyNewStartedCourse(notificationOpts) {
    notificationOpts.map((notification, index) => {
      this.showNotification(notification, 250 + index * 20);
    });
    this.setState({showNotification: false});
  }

  getCourseDetailsUrl(courseId) {
    return `/course/${courseId}`;
  }

  render() {
    const {notifications, newStartedCourses} = this.props;
    // show notification about the new started course
    if (this.state.showNotification && newStartedCourses.length > 0) {
      const newStartedCourseNotification = newStartedCourses.map((course) => ({
        title: this.context.t('new_started_course_notification_title'),
        message: this.context.t('new_started_course_notification_message', {
          courseName: <Link to={this.getCourseDetailsUrl(course.id)} className="link-course-details">{course.title}</Link>,
          firstDayLearning: <strong>{DateUtils.formatDate(course.start_date)}</strong>
        }),
        position: 'tr',
        autoDismiss: 0
      }))
      this.notifyNewStartedCourse(newStartedCourseNotification);
    }
    return (
      <Notifications notifications={notifications} />
    )
  }
}

NotificationSystemComponent.propTypes = {
  notifications: React.PropTypes.array,
  newStartedCourses: React.PropTypes.array
};


NotificationSystemComponent.contextTypes = {
  t: React.PropTypes.func
};

export default NotificationSystemComponent;