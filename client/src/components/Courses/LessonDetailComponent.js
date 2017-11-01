import * as React from "react";
import {Component} from "react";
import FormField from "../Core/FormField";
export class LessonDetailComponent extends Component {
    render() {
        return (
            <div className="d-flex flex-vertical">
                <div>
                    <FormField formGroupId="lessonId" formControlName="lessonId" typeField="hidden"/>
                    <FormField formGroupId="lessonNameId" formLabel={this.context.t("lesson_name")}
                               isMandatoryField={true} formControlName="lessonName" typeField="custom_input"/>
                </div>
                <div>
                    <FormField formGroupId="lessonPeriodId" formLabel={this.context.t("lesson_period")}
                               isMandatoryField={true} formControlName="lessonPeriod" typeField="custom_input"/>
                </div>
                <div>
                    <FormField formGroupId="lessonDocumentId" formLabel={this.context.t("lesson_document")}
                               isMandatoryField={true} formControlName="lessonDocument" typeField="upload_file"/>
                </div>
                <div>
                    <FormField formGroupId="lessonDesciptionId" formLabel={this.context.t("lesson_name")}
                               isMandatoryField={true} formControlName="lessonDesciption" typeField="custom_textarea"/>
                </div>
            </div>
        )
    }
}

LessonDetailComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}

LessonDetailComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}