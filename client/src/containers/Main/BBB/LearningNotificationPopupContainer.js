import * as React from 'react';
import {Component} from 'react';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import styles from './LearningNotificationPopupContainer.module.scss'
import FormDialogContainer from '../../Dialog/FormDialogContainer';
import UpcommingCourseNotificationPopup from '../../../components/Layout/UpcommingCoursePopup/UpcommingCourseNotificationPopup';
import {LessonStatus} from '../../../constants/LessonStatus';
import DateUtils from '../../../utils/DateUtils';
import {FINISH_LESSON} from '../../../actions/AsyncActionCreator';
import Network from '../../../utils/network';
import { SecurityUtils } from '../../../utils/SecurityUtils';

class LearningNotificationPopupContainer extends Component {
  isRoomExpired(teachingCourse, selectedLessonId) {
    const selectedLesson = teachingCourse.lessons.find(les => les.id === Number(selectedLessonId));
    if (!selectedLesson || selectedLesson.status !== LessonStatus.STARTED) {
      return false;
    }
    return DateUtils.compareTwoDateWithoutTime(new Date(), new Date(selectedLesson.updated_at)) !== 0;
  }

  render() {
    const {currentUser, course, handleSubmit, acceptJoinToClassRoom, closePopupJoinUpcomingClass,
      selectedLessonId, showUpcommingClassPopup, terminateLesson} = this.props;
    if (course == null) {
      return null;
    }
    const upcommingLesson = course.lessons.find(l => l.status === LessonStatus.NOT_STARTED);
    const isExpiredLesson = this.isRoomExpired(course, selectedLessonId);
    if (isExpiredLesson && SecurityUtils.isStudent(currentUser)) {
      return null;
    }
    const classRoomId = course && course.bigbluebutton_room ? course.bigbluebutton_room.slug : '';
    return (
      <FormDialogContainer show={showUpcommingClassPopup}
                           formName="joinToClassForm"
                           title={this.context.t('join_active_course_popup_title')}
                           acceptCallback={acceptJoinToClassRoom.bind(this)}
                           acceptLabel={this.context.t('join_to_class_button_name')}
                           canSubmit={!isExpiredLesson}
                           cancelCallback={closePopupJoinUpcomingClass.bind(this)}>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form" multiple>
          <UpcommingCourseNotificationPopup
            teachingCourse={course}
            selectedLessonId={selectedLessonId}
            lesson={upcommingLesson}
            teacherName={course.user.name}
            currentUser={currentUser}
            classRoomId={classRoomId}
            isExpiredLesson={isExpiredLesson}
            acceptJoinToClassRoom={acceptJoinToClassRoom.bind(this)}
            terminateLesson={terminateLesson}
            closePopupJoinUpcomingClass={closePopupJoinUpcomingClass.bind(this)}
          />
        </form>
      </FormDialogContainer>
    );
  }
}

LearningNotificationPopupContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LearningNotificationPopupContainer.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func,
  showUpcommingClassPopup: React.PropTypes.bool
};

const mapStateToProps = (state, props) => {
  const { course, session } = props;
  const { joinToClassForm } = state.form;
  const initialValues = {selectedLesson: 0};
  if (!course) {
    return { initialValues };
  }
  const upcommingLesson = course.lessons.find(l => l.status !== LessonStatus.FINISH);
  initialValues.selectedLesson = upcommingLesson.id;
  const selectedLessonId = joinToClassForm && joinToClassForm.values.selectedLesson ?  joinToClassForm.values.selectedLesson : upcommingLesson.id;
  return { initialValues, selectedLessonId };
};

const mapDispatchToProps = (dispatch, props) => ({
  terminateLesson: lessonId => {
    const res = dispatch({
      type: FINISH_LESSON,
      payload: Network().update(`lessons/${lessonId}`, {id: lessonId, status: LessonStatus.FINISH})
    });

    res.then(() => {
      props.closePopupJoinUpcomingClass();
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'joinToClassForm',
  fields: ['selectedLesson'],
})(cssModules(LearningNotificationPopupContainer, styles)));
