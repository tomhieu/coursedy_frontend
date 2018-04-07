import {Component} from "react";

class CourseCategoryComponent extends Component {
  render() {
    const {editMode = false, showLabel = true, placeholder, fieldLabel, fieldId, isMandatory, fieldName} = this.props;
    if (editMode) {
      return (
        <InlineEditFormField activated={this.props.activatedField.indexOf(fieldId) >= 0}
                             placeholder={placeholder || fieldLabel}
                             showLabel={showLabel}
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