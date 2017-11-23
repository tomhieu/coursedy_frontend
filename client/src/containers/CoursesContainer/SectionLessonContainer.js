import * as React from "react";
import {Component} from "react";
import EditLessonFormContainer from "./EditLessonFormContainer";
import * as LessonActions from "../../actions/LessonActionCreator";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {CardContent, IconButton} from "material-ui";
import {ActionDelete, ContentAddCircle} from "material-ui/svg-icons/index";
import {grey600, red900} from "material-ui/styles/colors";
import cssModules from "react-css-modules";
import styles from "./SectionDetail.module.scss";
import {btnStyles} from "../../utils/CustomStylesUtil";
import LessonDetailFormContainer from "./LessonDetailFormContainer";
import SectionDetailContainer from "./SectionDetailContainer";

class SectionLessonContainer extends Component {

    addLesson(sectionId) {
        this.props.dispatch(LessonActions.addLesson(sectionId));
    }

    saveLesson(lesson) {
        this.props.dispatch(LessonActions.saveOrUpdateLesson(Object.assign(lesson, {course_section_id: this.props.section.id, course_id: this.props.section.course_id})));
    }

    hideLessonPopup() {
        this.props.dispatch(LessonActions.hideLessonDetailPopup(this.props.section.id))
    }

    saveSection({title}) {
        this.props.dispatch(CourseActions.saveOrUpdateSection(this.props.section.id, title));
    }

    deleteSection(id) {
        this.props.dispatch(CourseActions.deleteSection(id));
    }

    isActivatedFieldOfLesson(activatedField, lesson) {
        return activatedField != null && activatedField.indexOf("__lesson_" + lesson.title) >= 0;
    }

    render() {
        const {section, showPopupEdit = false, activatedField} = this.props;
        return (
            <div key={'__section__' + section.id}>
                <Card>
                    <CardHeader actAsExpander={section.lessons.length > 0} showExpandableButton={section.lessons.length > 0}>
                        <div className="d-flex flex-horizontal">
                            <div className="section-title">
                                <SectionDetailContainer onSubmit={this.saveSection.bind(this)} section={section} {...this.props}
                                                        initialValues={activatedField === "sectionTitleId_" + section.id ? {title: section.title} : {}}>
                                </SectionDetailContainer>
                            </div>
                            <div className="d-flex flex-horizontal">
                                <IconButton iconStyle={btnStyles.largeIcon} style={btnStyles.large} onClick={() => this.addLesson(section.id)}>
                                    <ContentAddCircle color={red900} />
                                </IconButton>
                                <IconButton iconStyle={btnStyles.largeIcon} style={btnStyles.large}
                                            onClick={() => this.deleteSection(section.id)}>
                                    <ActionDelete color={grey600} />
                                </IconButton>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent expandable={true}>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                {
                                    section.lessons.map(lesson => (
                                        <LessonDetailFormContainer key={'___lesson__' + lesson.id} lesson={lesson} onSubmit={this.saveLesson.bind(this)} sectionUniqueKey={"__lesson_" + lesson.title}
                                                                   initialValues={ this.isActivatedFieldOfLesson(activatedField, lesson) === true ? lesson : {}} {...this.props}>
                                        </LessonDetailFormContainer>
                                    ))
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <EditLessonFormContainer show={showPopupEdit} hidePopup={this.hideLessonPopup.bind(this)} onSaveLesson={this.saveLesson.bind(this)} {...this.props}/>
            </div>
        )
    }
}

SectionLessonContainer.propTypes = {
    section: React.PropTypes.object.isRequired
};

SectionLessonContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {activatedField: state.CourseFormComponent.activatedField};
};

export default connect(
    mapStateToProps
)(cssModules(SectionLessonContainer, styles));