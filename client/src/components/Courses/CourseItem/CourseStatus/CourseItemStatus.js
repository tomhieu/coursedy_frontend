import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseItemStatus.module.scss';
import {LessonStatus} from '../../../../constants/LessonStatus';
import {CourseStatus} from '../../../../constants/CourseStatus';
import DateUtils from '../../../../utils/DateUtils';
import RefreshIcon from '../../../Core/Icons/RefreshIcon';
import SimpleDialogComponent from '../../../Core/SimpleDialogComponent';
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton";
import StartCourseFormContainer from "../../../../containers/Courses/TutorCourse/StartCourseFormContainer";

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
    if (!teachingCourse || !course) {
      return null;
    }
    if (course.id !== teachingCourse.id) {
      return null;
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

  stopTeachingCourse(course) {
    const res = this.props.stopCourse(course.id);
    res.then((r2) => {
      this.props.fetchListTutorActiveCourse();
    });
  }

  openConfirmationBeforeStopTeaching(course) {
    this.props.openConfirmationPopup(this.context.t('stop_teaching_course_title'),
      this.context.t('stop_teaching_course_message', {
        course_title: <strong>{course.title}</strong>
      }), this.stopTeachingCourse.bind(this, course));
  }

  showStartCourseWarning(course) {
    this.setState({
      showPopup: true,
      acceptCallback: (startDate) => {
        this.props.startCourse(course.id, startDate);
      }
    });
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  startTeachingCourse(startDate) {
    this.closePopup();
    const response = this.props.startCourse(this.props.course.id, startDate);
    response.then(res => {
      this.props.fetchListTutorCourse();
    });
  }

  render() {
    const {course, teachingCourse, isStudent} = this.props;
    const learningLesson = this.findLearningLesson(course, teachingCourse);

    if (course.status === CourseStatus.NOT_STARTED) {
      return (
        <div>
          <PrimaryButton isSmallButton round line={false}
                         customClasses="start-course-btn"
                         callback={this.showStartCourseWarning.bind(this, course)}
                         title={this.context.t('start_course')}
          />
          <StartCourseFormContainer show={this.state.showPopup}
                                    acceptCallback={this.state.acceptCallback}
                                    onSubmit={this.startTeachingCourse.bind(this)}
                                    cancelCallback={this.closePopup.bind(this)}
                                    {...this.props}>
          </StartCourseFormContainer>
        </div>
      )
    }

    if (learningLesson && this.isRoomExpired(learningLesson)) {
      return (
        <div>
          <PrimaryButton isSmallButton round line={false}
                         iconButton={true}
                         customClasses="start-course-btn"
                         callback={this.openRoomExpirationWarning.bind(this)}
                         title={this.context.t('rejoin_classroom')}>
            <a className="mr-5"><RefreshIcon fillColor="#FFFFFF"/></a>
          </PrimaryButton>
          <SimpleDialogComponent show={this.state.showTerminateLessonPopup}
                                 title={this.context.t('lesson_room_is_expired_title')}
                                 acceptCallback={this.terminateLesson.bind(this)}
                                 cancelCallback={this.closeTerminateLesson.bind(this)}>
            <span>{this.context.t('lesson_room_is_expired_msg')}</span>
          </SimpleDialogComponent>
        </div>
      )
    }

    if (learningLesson && !this.isRoomExpired(learningLesson)) {
      return (
        <PrimaryButton isSmallButton round line={false}
                       iconButton={true}
                       customClasses="start-course-btn"
                       callback={this.rejoinToClassroom.bind(this, teachingCourse, learningLesson)}
                       title={this.context.t('rejoin_classroom')}>
          <a className="mr-5"><RefreshIcon fillColor="#FFFFFF"/></a>
        </PrimaryButton>
      )
    }

    if (course.status === CourseStatus.STARTED && !learningLesson) {
      return (
        <PrimaryButton
          isSmallButton
          round
          line={false}
          customClasses="start-course-btn"
          callback={this.openConfirmationBeforeStopTeaching.bind(this, course)}
          title={this.context.t('stop_course')}
        />
      )
    }
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
