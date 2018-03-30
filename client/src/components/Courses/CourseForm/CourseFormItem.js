import {Component} from "react";
import * as React from "react";
import InlineEditFormField from "../../Core/InlineEditFormField";
import FormField from "../../Core/FormField";

class CourseFormItem extends Component {
  render() {
    const {editMode, fieldId, isMandatory, fieldName} = this.props;
    if (editMode) {
      return (
        <InlineEditFormField activated={this.props.activatedField === fieldId}
                             isMandatoryField={isMandatory}
                             formControlName={fieldName}
                             {...this.props}>
        </InlineEditFormField>
      )
    } else {
      return (
        <FormField isMandatoryField={isMandatory}
                   formControlName={fieldName} {...this.props}>
        </FormField>
      )
    }
  }
}