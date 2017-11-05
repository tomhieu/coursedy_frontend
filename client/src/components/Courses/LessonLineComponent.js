import {Component} from "react";
import InlineEditFormComponent from "../InlineEditFormComponent";
import * as React from "react";
import EditLessonFormContainer from "../../containers/CoursesContainer/EditLessonFormContainer";
import {hideLessonDetailPopup, saveLessonDetail} from "../../actions/CourseFormActionCreator";
class LessonLineComponent extends Component {
    constructor(props) {
        super(props)
    }

    hidePopup() {
        this.props.dispatch(hideLessonDetailPopup(this.props.lesson.posId))
    }

    saveLesson(lesson) {
        lesson['posId'] = this.props.lesson.posId;
        this.props.dispatch(saveLessonDetail(lesson));
    }

    onUpdateLessonName(lessonName, onSuccess) {
        this.props.dispatch(saveLessonDetail({lessonName: lessonName.speciality, posId: this.props.lesson.posId}));
        onSuccess();
    }

    onUpdateLessonPeriod(lessonPeriod, onSuccess) {
        this.props.dispatch(saveLessonDetail({lessonPeriod: lessonPeriod, posId: this.props.lesson.posId}));
        onSuccess();
    }

    render() {
        const{lesson, showPopupEdit, onDeleteLesson, editLessonDetail} = this.props;
        return (
            <div className="d-flex flex-horizontal flex-wrap">
                <div className="index-lesson-col d-flex flex-auto justify-content-center">
                    <div className="align-self-center">{lesson.posId}</div>
                </div>
                <div className="lesson-name-col d-flex flex-auto justify-content-center">
                    <InlineEditFormComponent
                        onSubmit={this.onUpdateLessonName.bind(this)}
                        displayStyle='dart-text'
                        content={lesson.lessonName}
                        name='speciality'
                        className="align-self-center"
                    />
                </div>
                <div className="lesson-per-col d-flex flex-auto justify-content-center">
                    <InlineEditFormComponent
                        onSubmit={this.onUpdateLessonPeriod.bind(this)}
                        displayStyle='dart-text'
                        content={lesson.lessonPeriod}
                        name='speciality'
                    />
                </div>
                <div className="lesson-del-col d-flex flex-auto justify-content-center">
                    <a className="icon-delete align-self-center ml-10" onClick={() => onDeleteLesson(lesson.posId)} title={lesson.lessonName}></a>
                </div>
                <div className="lesson-add-col d-flex flex-auto justify-content-center">
                    <a className="align-self-center" onClick={() => editLessonDetail(lesson.posId)}>{this.context.t('lesson_link_edit')}</a>
                </div>
                <EditLessonFormContainer lessonPosId={lesson.posId} show={showPopupEdit} hidePopup={this.hidePopup.bind(this)} onSubmit={this.saveLesson.bind(this)} {...this.props}/>
            </div>
        )
    }
}

LessonLineComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default LessonLineComponent;