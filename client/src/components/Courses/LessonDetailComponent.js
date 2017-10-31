import {Component} from "react";
import FormField from "../Core/FormField";
import * as React from "react";
class LessonDetailComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const{handleSubmit} = this.props
        return (
            <div className="d-flex flex-vertical">
                <form onSubmit={handleSubmit(this.props.onSubmit)}>
                    <div>
                        <FormField formGroupId="lessonNameId" formLabel={this.context.t("lesson_name")} isMandatoryField={true} formControlName="lessonName" typeField="custom_input"/>
                    </div>
                    <div>
                        <FormField formGroupId="lessonPeriodId" formLabel={this.context.t("lesson_period")} isMandatoryField={true} formControlName="lessonPeriod" typeField="custom_input"/>
                    </div>
                    <div>
                        <FormField formGroupId="lessonDocumentId" formLabel={this.context.t("lesson_document")} isMandatoryField={true} formControlName="lessonDocument" typeField="upload_file"/>
                    </div>
                    <div>
                        <FormField formGroupId="lessonDesciptionId" formLabel={this.context.t("lesson_name")} isMandatoryField={true} formControlName="lessonDesciption" typeField="custom_textarea"/>
                    </div>
                </form>
            </div>
        )
    }
}

LessonDetailComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

LessonDetailComponent.propTypes = {
}

export default LessonDetailComponent;