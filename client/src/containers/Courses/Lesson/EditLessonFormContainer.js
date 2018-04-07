import * as React from "react";
import {Component} from "react";
import {LessonDetailComponent} from "../../../components/Courses/LessonDetailComponent";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {addDocumentForLesson, deleteDocumentForLesson} from "../../../actions/CourseFormActionCreator";
import FormDialogComponent from "../../Dialog/FormDialogContainer";
import {validate} from '../../../validations/LessonFormValidator';

class EditLessonFormContainer extends Component {
  constructor(props) {
    super(props);
    this.documents = [];
  }

  addDocumentForLesson(document) {
    this.documents.push(document);
  }

  onDeleteDocumentLesson(documentId) {
    this.documents.splice(this.documents.findIndex(doc => doc.uid === documentId), 1);
  }

  render() {
    const {show, hidePopup} = this.props;
    return (
      <FormDialogComponent show={show}
                           formName="lessonDetailForm"
                           title={this.context.t('lesson_popup_edit_title')}
                           cancelCallback={hidePopup}>
        <LessonDetailComponent addDocumentForLesson={this.addDocumentForLesson.bind(this)}
                               onDeleteDocumentLesson={this.onDeleteDocumentLesson.bind(this)} {...this.props}/>
      </FormDialogComponent>
    )
  }
}

EditLessonFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default connect(state => ({
  initialValues: state.courseDetails.lessonCreationForm != undefined ? state.courseDetails.lessonCreationForm.activeLesson : {}
}))(reduxForm({
  form: 'lessonDetailForm',
  fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption'],
  validate,
  enableReinitialize: true
})(EditLessonFormContainer));