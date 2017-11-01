import * as React from "react";
import {Component} from "react";
import LessonLineComponent from "../../components/Courses/LessonLineComponent";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import styles from "./ListLesson.module.scss";
import {addLesson} from "actions/CourseFormActionCreator";
import {editLessonDetail, hideLessonDetailPopup, saveLessonDetail} from "../../actions/CourseFormActionCreator";
import {reduxForm} from "redux-form";
import EditLessonFormComponent from "../../components/Courses/EditLessonFormComponent";
class ListLessonContainer extends Component {
    constructor(props) {
        super(props);
    }

    onUpdateLessonName(lessonName) {
        console.log('update lession name ' + lessonName);
    }

    onUpdateLessonPeriod(lessonPeriod) {
        console.log('update lession name ' + lessonPeriod);
    }

    editLessonDetail(lessonId) {
        this.props.dispatch(editLessonDetail(lessonId));
    }

    addNewLesson() {
        this.props.dispatch(addLesson());
    }

    saveLesson(lesson) {
        lesson['posId'] = this.props.activeLesson;
        this.props.dispatch(saveLessonDetail(lesson));
    }
    hidePopup() {
        this.props.dispatch(hideLessonDetailPopup())
    }

    render() {
        const { lessonList, showPopupEdit } = this.props;
        return (
            <div className="d-flex flex-vertical">
                <button onClick={this.addNewLesson.bind(this)}>{this.context.t('lesson_add_more')}</button>
                {
                    lessonList.map((lesson) =>
                        <div key={lesson.posId}>
                            <LessonLineComponent lesson={lesson} onUpdateLessonName={this.onUpdateLessonName.bind(this)}
                                                 onUpdateLessonPeriode={this.onUpdateLessonPeriod.bind(this)} editLessonDetail={this.editLessonDetail.bind(this)}/>
                        </div>
                    )
                }
                <EditLessonFormComponent show={showPopupEdit} hidePopup={this.hidePopup.bind(this)} onSubmit={this.saveLesson.bind(this)} {...this.props}/>
            </div>
        )
    }
}

ListLessonContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { CourseFormComponent } = state;
    const { courseCreationForm } = CourseFormComponent;
    const { lessonList, showPopupEdit, activeLesson } = courseCreationForm;
    return {
        lessonList,
        showPopupEdit,
        activeLesson
    }
};

export default connect(mapStateToProps)(reduxForm({
    form: 'lessonDetailForm',
    fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption']
})(cssModules(ListLessonContainer, styles)));
