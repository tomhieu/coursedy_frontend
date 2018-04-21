import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import FormField from "../../../components/Core/FormField";
import {Component} from "react";
import {renderPreviewFile} from "../../../components/Core/CustomComponents";
import * as LessonActions from "../../../actions/LessonActionCreator";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from '../../../validations/LessonFormValidator';
import * as React from "react";
import * as CourseActions from "actions/CourseFormActionCreator";
import {DELETE_LESSON} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";

class LessonDetailFormContainer extends Component {
  addDocumentForLesson(document) {
    const {lesson} = this.props;
    this.props.dispatch(LessonActions.addDocumentForLesson(lesson.course_section_id, lesson.id, document))
  }

  onDeleteDocumentLesson(documentId) {
    const {lesson} = this.props;
    this.props.dispatch(LessonActions.deleteDocumentForLesson(lesson.course_section_id, lesson.id, documentId))
  }

  onDeleteLesson(lessonId) {
    this.props.deleteLesson(lessonId, this.props.lesson.course_section_id);
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
                fieldId={"lessonPeriodId" + sectionUniqueKey} fieldLabel={this.context.t("lesson_period")}
                isMandatoryField={true} formControlName="period" typeField="custom_input"
                onClosedField={this.onClosedField.bind(this)}
                content={lesson.period + ' phut'} displayStyle="default-field" {...this.props}
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
                    documents.map((doc) => renderPreviewFile(doc, () => this.onDeleteDocumentLesson(doc.id)))
                  }
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <button type="button" onClick={() => this.onDeleteLesson(lesson.id)}>{this.context.t('lesson_delete_btn')}</button>
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
  })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'lessonEditForm',
  fields: ['title', 'period', 'description'],
  validate,
  enableReinitialize: true
})(LessonDetailFormContainer));