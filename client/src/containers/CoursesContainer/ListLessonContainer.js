import * as React from "react";
import {Component} from "react";
import LessonLineComponent from "../../components/Courses/LessonLineComponent";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import styles from "./ListLesson.module.scss";
import {addLesson} from "actions/CourseFormActionCreator";
import {
    deleteLesson, editLessonDetail, hideLessonDetailPopup,
    saveLessonDetail
} from "../../actions/CourseFormActionCreator";
import {reduxForm} from "redux-form";
import EditLessonFormContainer from "./EditLessonFormContainer";
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

    deleteNewLesson(lessonId) {
        this.props.dispatch(deleteLesson(lessonId));
    }

    render() {
        const { lessonList, activeLesson } = this.props;
        return (
            <div className="d-flex flex-vertical">
                <button onClick={this.addNewLesson.bind(this)}>{this.context.t('lesson_add_more')}</button>
                {
                    lessonList.map((lesson) =>
                        <div key={lesson.posId}>
                            <LessonLineComponent lesson={lesson} showPopupEdit={lesson.showPopupEdit} onUpdateLessonName={this.onUpdateLessonName.bind(this)} onDeleteLesson={this.deleteNewLesson.bind(this)}
                                                 onUpdateLessonPeriode={this.onUpdateLessonPeriod.bind(this)} editLessonDetail={this.editLessonDetail.bind(this)} {...this.props}/>
                        </div>
                    )
                }

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
    const { lessonList, activeLesson } = courseCreationForm;
    return {
        lessonList,
        activeLesson
    }
};

export default connect(mapStateToProps)(reduxForm({
    form: 'lessonDetailForm',
    fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption']
})(cssModules(ListLessonContainer, styles)));
