import {Component} from "react";
import * as React from "react";
import LessonLineComponent from "../../components/Courses/LessonLineComponent";
class ListLessonContainer extends Component {

    onUpdateLessonName(lession_uid) {
        console.log('update lession name');
    }

    editLessonDetail(lesson) {
        console.log(lesson)
    }

    render() {
        const { listLesson } = this.props;
        return (
            <div className="d-flex flex-vertical">
                {
                    listLesson.map((lesson) => <LessonLineComponent pos={lesson.posId}
                                                                  onUpdateLessonName={this.onUpdateLessonName.bind(this)} editLessonDetail={this.editLessonDetail.bind(this)}/>)
                }
            </div>
        )
    }
}