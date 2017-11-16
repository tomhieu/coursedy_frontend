import * as React from "react";
import {Component} from "react";
import InlineEditFormField from "../../components/Core/InlineEditFormField";
import EditLessonFormContainer from "./EditLessonFormContainer";
import FormField from "../../components/Core/FormField";
import {renderPreviewFile} from "../../components/CustomComponents";
import * as LessonActions from "../../actions/LessonActionCreator";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {IconButton} from "material-ui";
import {ActionDelete, ContentAddCircle} from "material-ui/svg-icons/index";
import {grey600, red900} from "material-ui/styles/colors";
import cssModules from "react-css-modules";
import styles from "./SectionDetail.module.scss";
import {btnStyles} from "../../utils/CustomStylesUtil";
import LessonDetailFormContainer from "./LessonDetailFormContainer";
class SectionDetailContainer extends Component {
    addLesson(sectionId) {
        this.props.dispatch(LessonActions.addLesson(sectionId));
    }

    saveLesson(lesson) {
        this.props.dispatch(LessonActions.saveOrUpdateLesson(Object.assign(lesson, {course_section_id: this.props.section.id, course_id: this.props.section.course_id})));
    }

    hideLessonPopup() {
        this.props.dispatch(LessonActions.hideLessonDetailPopup(this.props.section.id))
    }

    render() {
        const {handleSubmit, section, showPopupEdit = false, onDeleteSection, activatedField} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' key={section.id} multiple={true}>
                <Card>
                    <CardHeader actAsExpander={section.lessons.length > 0} showExpandableButton={section.lessons.length > 0}>
                        <div className="d-flex flex-horizontal">
                            <div className="section-title">
                                <InlineEditFormField activated={this.props.activatedField === "sectionTitleId_" + section.id} formGroupId={"sectionTitleId_" + section.id} showLabel={false} formLabel={this.context.t("section_title")} placeholder={this.context.t("section_title")}
                                                     content={section.title} isMandatoryField={true} formControlName="title" typeField="custom_input" {...this.props}></InlineEditFormField>
                            </div>
                            <div className="d-flex flex-horizontal">
                                <IconButton iconStyle={btnStyles.largeIcon} style={btnStyles.large} onClick={() => this.addLesson(section.id)}>
                                    <ContentAddCircle color={red900} />
                                </IconButton>
                                <IconButton iconStyle={btnStyles.largeIcon} style={btnStyles.large}
                                    onClick={() => onDeleteSection(section.id)}>
                                    <ActionDelete color={grey600} />
                                </IconButton>
                            </div>
                        </div>
                    </CardHeader>
                    <CardText expandable={true}>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                {
                                    section.lessons.map(lesson => (
                                        <LessonDetailFormContainer lesson={lesson} onSubmit={this.saveLesson.bind(this)} sectionUniqueKey={"__section_" + lesson.course_section_id}
                                                                   initialValues={activatedField.indexOf("__section_" + lesson.course_section_id) >= 0 ? lesson : {}}>
                                        </LessonDetailFormContainer>
                                    ))
                                }
                            </div>
                        </div>
                    </CardText>
                </Card>
                <EditLessonFormContainer show={showPopupEdit} hidePopup={this.hideLessonPopup.bind(this)} onSaveLesson={this.saveLesson.bind(this)} {...this.props}/>
            </form>
        )
    }
}

SectionDetailContainer.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    section: React.PropTypes.object.isRequired,
    onDeleteSection: React.PropTypes.func.isRequired
};

SectionDetailContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {activatedField: state.CourseFormComponent.activatedField};
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'sectionEditForm',
    fields: ['title'],
    enableReinitialize: true
})(cssModules(SectionDetailContainer, styles)));