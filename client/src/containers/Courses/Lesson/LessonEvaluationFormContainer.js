import * as React from "react";
import cssModules from "react-css-modules";
import styles from "./ListLesson.module.scss";
import RatingSelection from "../../../components/Rating/RatingSelection";
import FormDialogContainer from "../../Dialog/FormDialogContainer";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Component} from "react";
import CircleCheckIcon from "../../../components/Core/Icons/CircleCheckIcon";

class LessonEvaluationFormContainer extends Component {
  render() {
    const {lesson, bbbClassRoomSlug, handleSubmit, isEvaluating} = this.props;
    return (
      <FormDialogContainer show={true}
                           formName="lessonEvaluationForm"
                           title={this.context.t('lesson_rating_title')}
                           acceptCallback={this.props.evaluateLesson.bind(this, lesson)}
                           acceptLabel={this.context.t('lesson_rating_btn')}
                           cancelLabel={this.context.t('rejoin_class_room')}
                           customAcceptButtonStyling="button evaluation-lesson-button"
                           customCancelButtonStyling="button rejoin-class-button"
                           isProcessing={isEvaluating}
                           cancelCallback={this.props.rejoinToClassRoom.bind(this, bbbClassRoomSlug)}>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
          {
            isEvaluating ?
              <div className="d-flex flex-row align-items-center">
                <CircleCheckIcon message={this.context.t('thank_for_evaluation')}/>
              </div> : <RatingSelection/>
          }

        </form>
      </FormDialogContainer>
    )
  }
}

LessonEvaluationFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LessonEvaluationFormContainer.propTypes = {
  lesson: React.PropTypes.object.isRequired,
  bbbClassRoomSlug: React.PropTypes.string.isRequired,
  isEvaluating: React.PropTypes.bool.isRequired
};

export default connect()(reduxForm({
  form: 'lessonEvaluationForm',
})(cssModules(LessonEvaluationFormContainer, styles)));