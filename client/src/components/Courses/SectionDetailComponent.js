import {Component} from "react";
import InlineEditFormField from "../Core/InlineEditFormField";
import * as React from "react";
import EditLessonFormContainer from "../../containers/CoursesContainer/EditLessonFormContainer";
class SectionDetailComponent extends Component {
    render() {
        const {handleSubmit, section, showPopupEdit, onDeleteSection, addLesson} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <InlineEditFormField formGroupId="sectionTitleId" formLabel={this.context.t("section_title")} placeholder={this.context.t("section_title")}
                                             content={title} isMandatoryField={true} formControlName="title" typeField="custom_input"></InlineEditFormField>
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <InlineEditFormField formGroupId="sectionNameId" formLabel={this.context.t("section_name")} placeholder={this.context.t("section_name")}
                                             content={name} isMandatoryField={true} formControlName="name" typeField="custom_input"></InlineEditFormField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <div className="d-flex flex-vertical">
                            <a className="align-self-center" onClick={() => addLesson(section.id)}>{this.context.t('lesson_link_edit')}</a>
                            <a className="icon-delete align-self-center ml-10" onClick={() => onDeleteSection(section.id)} title={section.name}></a>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8">

                    </div>
                </div>
                <EditLessonFormContainer show={showPopupEdit} hidePopup={this.hidePopup.bind(this)} onSubmit={this.saveLesson.bind(this)} {...this.props}/>
            </form>
        )
    }
}

SectionDetailComponent.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    section: React.PropTypes.object.isRequired,
    showPopupEdit: React.PropTypes.bool.isRequired,
    onDeleteSection: React.PropTypes.func.isRequired,
    addLesson: React.PropTypes.func.isRequired
};

SectionDetailComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default SectionDetailComponent;