import {Component} from "react";
import * as React from "react";
import InlineEditFormField from "../../Core/InlineEditFormField";
import FormField from "../../Core/FormField";

class CourseFormItem extends Component {
  render() {
    const {editMode = false, fieldId, isMandatory, fieldName} = this.props;
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

FormField.propTypes = {
  editMode: React.PropTypes.bool,
  fieldId: React.PropTypes.string,
  showLabel: React.PropTypes.bool,
  fieldLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  isMandatory: React.PropTypes.bool,
  fieldName: React.PropTypes.string.isRequired,
  typeField: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  content: React.PropTypes.string,
  options: React.PropTypes.array,
  displayStyle: React.PropTypes.string,
  styleCustomField: React.PropTypes.string
};

export default CourseFormItem;