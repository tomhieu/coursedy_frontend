import {Component} from "react";
import InlineEditFormComponent from "../InlineEditFormComponent";
import * as React from "react";
class LessonLineComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const{pos, onUpdateLessonName, editLessonDetail} = this.props;
        return (
            <div className="d-flex flex-horizontal">
                <div className="lesson-pos">{pos}</div>
                <InlineEditFormComponent
                    onSubmit={onUpdateLessonName}
                    displayStyle='dart-text'
                    content=''
                    name='speciality'
                />
                <div>
                    <a onClick={editLessonDetail}>{this.context.t('lesson_link_edit')}</a>
                </div>
            </div>
        )
    }
}

LessonLineComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default LessonLineComponent;