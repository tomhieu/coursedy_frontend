import {Component} from "react";
import * as React from "react";
import LessonLineComponent from "../../components/Courses/LessonLineComponent";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import styles from "./ListLesson.module.scss";
import {addLesson} from "actions/CourseFormActionCreator";
class ListLessonContainer extends Component {

    onUpdateLessonName(lession_uid) {
        console.log('update lession name');
    }

    editLessonDetail(lesson) {
        console.log(lesson)
    }

    addNewLesson() {
        this.props.dispatch(addLesson());
    }

    render() {
        const { lessonList } = this.props;
        return (
            <div className="d-flex flex-vertical">
                <button onClick={this.addNewLesson.bind(this)}>{this.context.t('lesson_add_more')}</button>
                {
                    lessonList.map((lesson) => <LessonLineComponent pos={lesson.posId}
                                   onUpdateLessonName={this.onUpdateLessonName.bind(this)} editLessonDetail={this.editLessonDetail.bind(this)}/>)
                }
            </div>
        )
    }
}

ListLessonContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
    debugger
    const { CourseFormComponent } = state;
    const { courseCreationForm } = CourseFormComponent;
    const { lessonList } = courseCreationForm;
    return {
        lessonList
    }
};

export default connect(mapStateToProps)((cssModules(ListLessonContainer, styles)));
