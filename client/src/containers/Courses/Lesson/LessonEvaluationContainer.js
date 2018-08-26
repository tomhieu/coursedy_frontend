import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import Network from 'utils/network';
import styles from './ListLesson.module.scss';
import * as WebConstants from '../../../constants/WebConstants';
import { EVALUATE_AND_TERMINATE_LESSON } from '../../../actions/AsyncActionCreator';
import { fetchCourseToEvaluate } from '../../../actions/StudentActionCreator';
import LessonEvaluationFormContainer from './LessonEvaluationFormContainer';
import { joinToClassRoom } from '../../../actions/ListTutorCourseActionCreator';

class LessonEvaluationContainer extends Component {
  constructor(props) {
    super(props);
    this.courseId = this.props.match.params.courseId;
    this.bbbRoomSlug = this.props.match.params.bbbRoom;
  }

  componentWillMount() {
    this.props.hideFooter();
    this.props.validateCourseBeforeEvaluate(this.courseId, this.bbbRoomSlug);
  }

  doEvaluateLesson(rating) {
    this.props.evaluateLesson(this.props.lesson, rating);
  }

  render() {
    const { lesson, isEvaluating } = this.props;
    return (
      <div>
        {
          lesson !== null
            ? (
              <LessonEvaluationFormContainer
                lesson={lesson}
                bbbClassRoomSlug={this.bbbRoomSlug}
                onSubmit={this.doEvaluateLesson.bind(this)}
                isEvaluating={isEvaluating}
                {...this.props}
              />
            ) : null
        }
      </div>
    );
  }
}

LessonEvaluationContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LessonEvaluationContainer.propTypes = {};

const mapStateToProps = (state) => {
  const { LessonEvaluation } = state;
  const { lesson, activeCourse, isEvaluating } = LessonEvaluation;
  return { lesson, activeCourse, isEvaluating };
};

const mapDispatchToProps = dispatch => ({
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
  closeEvaluationPopup: () => dispatch({ type: CLOSE_EVALUATION_POPUP }),
  validateCourseBeforeEvaluate: (courseId, bbbRoomSlug) => {
    dispatch(fetchCourseToEvaluate(courseId, bbbRoomSlug));
  },
  rejoinToClassRoom: bbbClassRoomId => dispatch(joinToClassRoom(bbbClassRoomId)),
  evaluateLesson: (lesson, rating) => {
    dispatch({
      type: EVALUATE_AND_TERMINATE_LESSON,
      payload: Network().update(`lesson/${lesson.id}`, { lesson, rating })
    });
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(LessonEvaluationContainer, styles));
