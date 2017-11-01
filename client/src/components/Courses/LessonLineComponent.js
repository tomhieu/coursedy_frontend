import {Component} from "react";
import InlineEditFormComponent from "../InlineEditFormComponent";
import * as React from "react";
class LessonLineComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const{lesson, onUpdateLessonName, onUpdateLessonPeriode, editLessonDetail} = this.props;
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
                <div className="col-md-4 col-sm-4">
                    <InlineEditFormComponent
                        onSubmit={onUpdateLessonPeriode}
                        displayStyle='dart-text'
                        content={lesson.lessonPeriod}
                        name='speciality'
                    />
                </div>
                <div className="col-md-3 col-sm-3">
                    <a onClick={() => editLessonDetail(lesson.posId)}>{this.context.t('lesson_link_edit')}</a>
                </div>
            </div>
        )
    }
}

LessonLineComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default LessonLineComponent;