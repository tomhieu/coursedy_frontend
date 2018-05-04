import * as React from "react";
import {Component} from "react";
import FormField from "../Core/FormField";
import {renderPreviewFile} from "../Core/CustomComponents";

export class LessonDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {documents: []}
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form padding-15">
        <div className="d-flex flex-vertical">
          <div>
            <FormField fieldId="lesson_title_Id" fieldLabel={this.context.t("lesson_name")}
                       isMandatoryField={true} formControlName="title" typeField="custom_input"/>
          </div>
          <div>
            <FormField fieldId="lessonPeriodId" fieldLabel={this.context.t("lesson_period")}
                       isMandatoryField={true} formControlName="period" typeField="custom_input"/>
          </div>
          <div>
            <FormField fieldId="lessonDesciptionId" fieldLabel={this.context.t("lesson_desc")}
                       isMandatoryField={true} formControlName="description" typeField="custom_textarea"/>
          </div>
        </div>
      </form>
    )
  }
}

LessonDetailComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}