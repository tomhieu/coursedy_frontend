import * as React from "react";
import {Component} from "react";
import InlineEditFormField from "../../components/Core/InlineEditFormField";
import EditLessonFormContainer from "./EditLessonFormContainer";
import FormField from "../../components/Core/FormField";
import {renderPreviewFile} from "../../components/CustomComponents";
import * as LessonActions from "../../actions/LessonActionCreator";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
class SectionDetailContainer extends Component {
    renderLesson(lesson) {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <InlineEditFormField formGroupId="lessonNameId" formLabel={this.context.t("lesson_name")}
                                             isMandatoryField={true} formControlName="lessonName" typeField="custom_input" content={lesson.name}
                        ></InlineEditFormField>
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <InlineEditFormField formGroupId="lessonPeriodId" formLabel={this.context.t("lesson_period")}
                                             isMandatoryField={true} formControlName="lessonPeriod" typeField="custom_input" content={lesson.period}
                        ></InlineEditFormField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <a className="align-self-center" onClick={() => this.addNewLesson(lesson.id)}>{this.context.t('lesson_link_edit')}</a>
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <div>
                            <FormField formGroupId="lessonDocumentId" formLabel={this.context.t("lesson_document")} onUpload={this.addDocumentForLesson.bind(this)}
                                       isMandatoryField={true} formControlName="lessonDocument" typeField="upload_file"/>
                            <div className="d-flex flex-vertical">
                                {
                                    lesson.documents.map((doc) => renderPreviewFile(doc, this.onDeleteDocumentLesson.bind(this)))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    addLesson(sectionId) {
        this.props.dispatch(LessonActions.addLesson(sectionId));
    }

    saveLesson(lesson) {
        this.props.dispatch(LessonActions.saveOrUpdateLesson(Object.assign(lesson, {section_id: this.props.section.id})));
    }

    addDocumentForLesson(sectionId, lessonId, document) {
        this.props.dispatch(LessonActions.addDocumentForLesson(sectionId, lessonId, document))
    }

    onDeleteDocumentLesson(sectionId, lessonId, document) {
        this.props.dispatch(LessonActions.deleteDocumentForLesson(sectionId, lessonId, document))
    }

    hideLessonPopup() {

    }

    render() {
        const {handleSubmit, section, showPopupEdit, onDeleteSection} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <InlineEditFormField formGroupId="sectionTitleId" showLabel={false} formLabel={this.context.t("section_title")} placeholder={this.context.t("section_title")}
                                             content={section.title} isMandatoryField={true} formControlName="title" typeField="custom_input"></InlineEditFormField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-3">
                        <div className="d-flex flex-vertical">
                            <a className="align-self-center" onClick={() => this.addLesson(section.id)}>{this.context.t('lesson_link_edit')}</a>
                            <a className="icon-delete align-self-center ml-10" onClick={() => onDeleteSection(section.id)} title={section.name}></a>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        {
                            section.lessons.map(lesson => {this.renderLesson(lesson)})
                        }
                    </div>
                </div>
                <EditLessonFormContainer show={showPopupEdit} hidePopup={this.hideLessonPopup.bind(this)} onSaveLesson={this.saveLesson.bind(this)} {...this.props}/>
            </form>
        )
    }
}

SectionDetailContainer.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    section: React.PropTypes.object.isRequired,
    showPopupEdit: React.PropTypes.bool.isRequired,
    onDeleteSection: React.PropTypes.func.isRequired
};

SectionDetailContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'sectionEditForm',
    fields: ['name', 'title']
})(SectionDetailContainer));