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

    render() {
        const{lesson, showPopupEdit, onUpdateLessonName, onUpdateLessonPeriode, onDeleteLesson, editLessonDetail} = this.props;
        return (
            <div className="row">
                <div className="col-md-1 col-sm-1">{lesson.posId}</div>
                <div className="col-md-4 col-sm-4">
                    <InlineEditFormComponent
                        onSubmit={onUpdateLessonName}
                        displayStyle='dart-text'
                        content={lesson.lessonName}
                        name='speciality'
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <InlineEditFormComponent
                        onSubmit={onUpdateLessonPeriode}
                        displayStyle='dart-text'
                        content={lesson.lessonPeriod}
                        name='speciality'
                    />
                </div>
                <div className="col-md-2 col-sm-2">
                    <a className="icon-delete ml-10" onClick={() => onDeleteLesson(lesson.posId)} title={file.fileName}></a>
                </div>
                <div className="col-md-3 col-sm-3">
                    <a onClick={() => editLessonDetail(lesson.posId)}>{this.context.t('lesson_link_edit')}</a>
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