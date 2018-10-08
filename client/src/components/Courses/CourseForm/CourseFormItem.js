import * as React from 'react';
import { Component } from 'react';
import InlineEditFormField from '../../Core/InlineEditFormField';
import FormField from '../../Core/FormField';

class CourseFormItem extends Component {
  closeInlineField(fieldId) {
    this.props.onClosedField(fieldId);
  }
  render() {
    const {
      editMode = false, showLabel = true, fieldLabel, fieldId, isMandatory, fieldName, activatedField = [],
      isRichTextField = false, canEditable, typeField, options, placeholder
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
          canEditable={canEditable}
          submitting={this.props.submitting}
          pristine={this.props.pristine}
          displayStyle={this.props.displayStyle}
          activatedFieldIds={this.props.activatedFieldIds}
          typeField={typeField}
          options={options}
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          content={this.props.content}
          onActivatedField={this.props.onActivatedField.bind(this)}
          onClosedField={this.closeInlineField.bind(this)}
        />
      );
    }

    return (
      <FormField
        isMandatoryField={isMandatory}
        formControlName={fieldName}
        fieldId={fieldId}
        fieldLabel={fieldLabel}
        placeholder={placeholder || ''}
        typeField={typeField}
        options={options}
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
  content: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  options: React.PropTypes.array,
  displayStyle: React.PropTypes.string,
  styleCustomField: React.PropTypes.string,
  activatedField: React.PropTypes.array,
  isRichTextField: React.PropTypes.bool,
  canEditable: React.PropTypes.bool
};

export default CourseFormItem;
