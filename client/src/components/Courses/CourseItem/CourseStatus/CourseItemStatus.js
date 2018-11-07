import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseItemStatus.module.scss';
import {LessonStatus} from '../../../../constants/LessonStatus';
import DateUtils from '../../../../utils/DateUtils';
import RefreshIcon from '../../../Core/Icons/RefreshIcon';
import SimpleDialogComponent from '../../../Core/SimpleDialogComponent';

/**
 * @Course group item template 2
 * @Use for CoursePage
 */
class CourseItemStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerminateLessonPopup: false
    }
  }

  findLearningLesson(course, teachingCourse) {
    if (course.id !== teachingCourse.id) {
      return false;
    }

    return teachingCourse.lessons.find(l => l.status === LessonStatus.STARTED);
  }

  isRoomExpired(learningLesson) {
    const isExpired = DateUtils.compareTwoDateWithoutTime(new Date(), new Date(learningLesson.updated_at)) !== 0;
    return isExpired;
  }

  openRoomExpirationWarning() {
    this.setState({
      showTerminateLessonPopup: false
    });
  }

  rejoinToClassroom(teachingCourse, learningLesson) {
    const classRoomId = teachingCourse && teachingCourse.bigbluebutton_room ? teachingCourse.bigbluebutton_room.slug : '';
    this.props.reJoinToBBBRoom(classRoomId, learningLesson.id, null);
  }

  closeTerminateLesson() {
    this.setState({
      showTerminateLessonPopup: false
    });
  }

  terminateLesson(lessonId) {
    this.props.terminateLesson(lessonId);
    this.closeTerminateLesson();
  }

  render() {
    const {course, teachingCourse, isStudent} = this.props;
    const learningLesson = this.findLearningLesson(course, teachingCourse);

    return (
      <div className={`${styles.courseStatus} ${styles.notStart}`}>
        <span>{this.context.t(course.verification_status || course.status)}</span>
        {
          learningLesson ?
            this.isRoomExpired(learningLesson) ? <a onClick={this.openRoomExpirationWarning.bind(this)}><RefreshIcon/></a>
              : <a onClick={this.rejoinToClassroom.bind(this, teachingCourse, learningLesson)}><RefreshIcon/></a>
            : null
        }
        <SimpleDialogComponent show={this.state.showTerminateLessonPopup}
                               title={this.context.t('lesson_room_is_expired_title')}
                               acceptCallback={this.terminateLesson.bind(this)}
                               cancelCallback={this.closeTerminateLesson.bind(this)}>
          <span>{this.context.t('lesson_room_is_expired_msg')}</span>
        </SimpleDialogComponent>
      </div>
    )
  }
}

CourseItemStatus.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseItemStatus.propTypes = {
  // the public course will have some additional feature like following
  course: React.PropTypes.object.isRequired,
  teachingCourse: React.PropTypes.object,
  isStudent: React.PropTypes.object,
  terminateLesson: React.PropTypes.func,
  joinToBBBRoom: React.PropTypes.func
};

export default cssModules(CourseItemStatus, styles);
