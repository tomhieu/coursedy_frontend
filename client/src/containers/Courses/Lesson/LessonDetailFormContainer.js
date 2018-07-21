import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import FormField from "../../../components/Core/FormField";
import * as React from "react";
import {Component} from "react";
import {renderPreviewFile} from "../../../components/Core/CustomComponents";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from '../../../validations/LessonFormValidator';
import * as CourseActions from "actions/CourseFormActionCreator";
import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_FOR_LESSON,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_FOR_LESSON,
  DELETE_LESSON
} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";
import {TT} from "utils/locale";
import PrimaryButton from "../../../components/Core/PrimaryButton/PrimaryButton";
import * as MainActions from "../../../actions/MainActionCreator";

class LessonDetailFormContainer extends Component {
  addDocumentForLesson(document) {
    const {lesson} = this.props;
    this.props.addDocument(lesson.course_section_id, lesson.id, document);
  }

  onDeleteDocumentLesson(documentId) {
    const {lesson} = this.props;
    this.props.deleteDocument(lesson.course_section_id, lesson.id, documentId);
  }

  onDeleteLesson(lessonId) {
    this.props.deleteLesson(lessonId, this.props.lesson.course_section_id);
  }

  showDeleteWarning(lessonId, lessonName) {
    this.props.openConfirmationPopup(
      this.context.t('warning_delete_lesson_title'),
      this.context.t('warning_delete_lesson_message', {lessonName: <strong>{lessonName}</strong>, seperator: <br></br>}),
      this.onDeleteLesson.bind(this, lessonId)
    )
  }

  showDeleteDocumentWarning(documentId, documentName) {
    this.props.openConfirmationPopup(
      this.context.t('warning_delete_lesson_document_title'),
      this.context.t('warning_delete_lesson_document_message', {documentName: <strong>{documentName}</strong>}),
      this.onDeleteDocumentLesson.bind(this, documentId)
    )
  }

  onClosedField(fieldIds) {
    this.props.reset();
    this.props.dispatch(CourseActions.closedEditField(fieldIds));
  }

  render() {
    const {handleSubmit, lesson, sectionUniqueKey} = this.props;
    const documents = lesson.documents.map((doc) => {
      doc.fileName = doc.name;
      return doc;
    });
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form lesson-detail-form' multiple={true}>
        <div key={lesson.id} className="lesson-section-seperator">
          <div className="row">
            <div className="col-sm-8 col-md-8">
              <InlineEditFormField activated={this.props.activatedField.indexOf("lessonNameId" + sectionUniqueKey) >= 0}
                                   fieldId={"lessonNameId" + sectionUniqueKey}
                                   fieldLabel={this.context.t("lesson_name")}
                                   isMandatoryField={true} formControlName="title" typeField="custom_input"
                                   onClosedField={this.onClosedField.bind(this)}
                                   content={lesson.title} displayStyle="default-field" {...this.props}
              ></InlineEditFormField>
            </div>
            <div className="col-sm-4 col-md-4">
              <InlineEditFormField
                activated={this.props.activatedField.indexOf("lessonPeriodId" + sectionUniqueKey) >= 0}
                fieldId={"lessonPeriodId" + sectionUniqueKey} fieldLabel={this.context.t("lesson_period_short")}
                isMandatoryField={true} formControlName="period" typeField="custom_input"
                onClosedField={this.onClosedField.bind(this)}
                content={lesson.period + ' ' + TT.t('lesson_period_unit')} displayStyle="default-field" {...this.props}
              ></InlineEditFormField>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <div className="d-flex flex-vertical">
                <InlineEditFormField
                  activated={this.props.activatedField.indexOf("lessonDescId" + sectionUniqueKey) >= 0}
                  fieldId={"lessonDescId" + sectionUniqueKey}
                  fieldLabel={this.context.t("lesson_desc")}
                  isMandatoryField={true} formControlName="description" typeField="custom_textarea"
                  onClosedField={this.onClosedField.bind(this)}
                  content={lesson.description} displayStyle="default-field" {...this.props}
                ></InlineEditFormField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12">
              <div>
                <FormField fieldId="lessonDocumentId" showLabel={false} fieldLabel={this.context.t("lesson_material")}
                           onUpload={this.addDocumentForLesson.bind(this)}
                           isMandatoryField={true} zoneHeight="50px" formControlName="documents"
                           typeField="upload_file"/>
                <div className="d-flex flex-vertical">
                  {
                    documents.map((doc) => renderPreviewFile(doc, () => this.showDeleteDocumentWarning(doc.id, doc.name)))
                  }
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <PrimaryButton type="button"
                             callback={this.showDeleteWarning.bind(this, lesson.id, lesson.title)}
                             isSmallButton={true}
                             title={this.context.t('lesson_delete_btn')}>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

LessonDetailFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const isActivatedFieldOfLesson = (activatedFields, lesson) => {
  if (!Array.isArray(activatedFields) || activatedFields.length === 0) {
    return false;
  }
  return activatedFields.filter((field) => field.indexOf("__lesson_" + lesson.id) >= 0).length > 0;
}

const mapStateToProps = (state, props) => {
  const initialValues = isActivatedFieldOfLesson(props.activatedField, props.lesson) === true ? props.lesson : {};
  return {initialValues: initialValues};
};

const mapDispatchToProps = (dispatch) => ({
  deleteLesson: (lessonId, sectionId) => dispatch({
    type: DELETE_LESSON,
    payload: Network().delete('lessons/' + lessonId),
    meta: 'sectionLessonPlaceholder' + sectionId
  }),
  addDocument: (sectionId, lessonId, document) => dispatch({
    type: ADD_DOCUMENT,
    payload: Network().post('documents', {lesson_id: lessonId, item: document.content, name: document.fileName})
      .then((res) => dispatch({
        type: ADD_DOCUMENT_FOR_LESSON,
        data: {sectionId: sectionId, lessonId: lessonId, document: res}
      })),
    meta: 'sectionLessonPlaceholder' + sectionId
  }),
  deleteDocument: (sectionId, lessonId, documentId) => dispatch({
    type: DELETE_DOCUMENT,
    payload: Network().delete('documents/' + documentId).then((res) =>
      dispatch({
      type: DELETE_DOCUMENT_FOR_LESSON,
      data: {sectionId: sectionId, lessonId: lessonId, documentId: res.id}
    })),
    meta: 'sectionLessonPlaceholder' + sectionId
  }),
  openConfirmationPopup: (title, message, callback) => dispatch(MainActions.openConfirmationPopup(title, message, callback))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'lessonEditForm',
  fields: ['title', 'period', 'description'],
  validate,
  enableReinitialize: true
})(LessonDetailFormContainer));