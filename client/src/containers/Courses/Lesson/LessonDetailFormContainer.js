import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import FormField from "../../../components/Core/FormField";
import {Component} from "react";
import {renderPreviewFile} from "../../../components/Core/CustomComponents";
import * as LessonActions from "../../../actions/LessonActionCreator";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {validate} from '../../../validations/LessonFormValidator';
import * as React from "react";
class LessonDetailFormContainer extends Component {
    addDocumentForLesson(sectionId, lessonId, document) {
        this.props.dispatch(LessonActions.addDocumentForLesson(sectionId, lessonId, document))
    }

    onDeleteDocumentLesson(sectionId, lessonId, document) {
        this.props.dispatch(LessonActions.deleteDocumentForLesson(sectionId, lessonId, document))
    }
    render() {
        const {handleSubmit, lesson, sectionUniqueKey} = this.props;
        const {documents = []} = lesson;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form lesson-detail-form' multiple={true}>
                <div key={lesson.id} className="lesson-section-seperator">
                    <div className="row">
                        <div className="col-sm-8 col-md-8">
                            <InlineEditFormField activated={this.props.activatedField === "lessonNameId" + sectionUniqueKey} fieldId={"lessonNameId" + sectionUniqueKey} fieldLabel={this.context.t("lesson_name")}
                                                 isMandatoryField={true} formControlName="title" typeField="custom_input" content={lesson.title} displayStyle="default-field" {...this.props}
                            ></InlineEditFormField>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            <InlineEditFormField activated={this.props.activatedField === "lessonPeriodId"  + sectionUniqueKey} fieldId={"lessonPeriodId" + sectionUniqueKey} fieldLabel={this.context.t("lesson_period")}
                                                 isMandatoryField={true} formControlName="period" typeField="custom_input" content={lesson.period + ' phut'} displayStyle="default-field" {...this.props}
                            ></InlineEditFormField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-md-4">
                            <div className="d-flex flex-vertical">
                                <InlineEditFormField activated={this.props.activatedField === "lessonDescId" + sectionUniqueKey} fieldId={"lessonDescId" + sectionUniqueKey} showLabel={false} fieldLabel={this.context.t("lesson_desc")}
                                                     isMandatoryField={true} formControlName="description" typeField="custom_input" content={lesson.description} displayStyle="default-field" {...this.props}
                                ></InlineEditFormField>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8">
                            <div>
                                <FormField fieldId="lessonDocumentId" showLabel={false} fieldLabel={this.context.t("lesson_material")} onUpload={this.addDocumentForLesson.bind(this)}
                                           isMandatoryField={true} zoneHeight="100px" formControlName="documents" typeField="upload_file"/>
                                <div className="d-flex flex-vertical">
                                    {
                                        documents.map((doc) => renderPreviewFile(doc, this.onDeleteDocumentLesson.bind(this)))
                                    }
                                </div>
                            </div>
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

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'lessonEditForm',
    fields: ['title', 'period', 'description'],
    validate,
    enableReinitialize: true
})(LessonDetailFormContainer));