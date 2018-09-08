import * as React from 'react';
import { Component } from 'react';
import InlineEditFormField from '../../Core/InlineEditFormField';
import FormField from '../../Core/FormField';

class CourseFormItem extends Component {
  render() {
    const {
      editMode = false, showLabel = true, placeholder,
      fieldLabel, fieldId, isMandatory, fieldName, activatedField = [], isRichTextField = false
    } = this.props;
    if (editMode) {
      return (
        <InlineEditFormField
          activated={activatedField.indexOf(fieldId) >= 0}
          placeholder={placeholder || fieldLabel}
          showLabel={showLabel}
          isMandatoryField={isMandatory}
          formControlName={fieldName}
          isRichTextField={isRichTextField}
          {...this.props}
        />
      );
    }

    return (
      <FormField
        isMandatoryField={isMandatory}
        formControlName={fieldName}
        {...this.props}
      />
    );
  }
}

CourseFormItem.propTypes = {
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
  styleCustomField: React.PropTypes.string,
  activatedField: React.PropTypes.array,
  isRichTextField: React.PropTypes.bool
};

export default CourseFormItem;
