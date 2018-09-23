import React, { Component } from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';
import cssModules from 'react-css-modules';
import { cropImageInput } from 'components/Core/CustomComponents';
import {
  renderCheckBoxField, renderDatePicker, renderField, renderMultiSelect,
  renderSelect, renderSingleFileInput, renderTextAreaField, renderRichTextEditor, renderCurrencyField
} from './CustomComponents';
import styles from './FormField.module.scss';

import normalizeCurrency from './normalizeCurrencyNumber.js';

class FormField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formControlName, fieldLabel, showLabel = true, placeholder, isMandatoryField = false,
      typeField, type, zoneHeight = 'auto', internalPreview = false, previewUrl, onUpload, rows, options,
      selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved,
      lang = 'vn',
      ...restProps
    } = this.props;

    const fieldComponent = this.buildFieldRender(formControlName, placeholder, typeField, type,
      zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved, lang, restProps);
    return (
      <FormGroup controlId={this.props.fieldId}>
        {
          showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (
            <ControlLabel>
              {' '}
              {fieldLabel}
              {' '}
              {isMandatoryField && <span className="red">*</span>}
              {' '}
            </ControlLabel>) : ''
        }
        <div className={`dark-picker dark-picker-bright ${customClassName}`}>
          {fieldComponent}
        </div>
      </FormGroup>
    );
  }

  buildFieldRender(formControlName, placeholder, typeField, type, zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved, lang, restProps) {
    let fieldComponent;
    const fieldClasses = 'form-control';

    switch (typeField) {
      case 'hidden': {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} component="input" className="hidden" />;
        break;
      }
      case 'custom_input': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            type={type}
            disabled={this.props.disabled}
            component={renderField}
            onChange={this.props.onChange}
            customClassName={fieldClasses}
            {...restProps}
          />
        );
        break;
      }
      case 'checkbox': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            type="checkbox"
            disabled={this.props.disabled}
            label={this.props.fieldLabel}
            component={renderCheckBoxField}
            onChange={this.props.onChange}
            customClassName={fieldClasses}
          />
        );
        break;
      }
      case 'custom_select': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            disabled={this.props.disabled}
            component={renderSelect(options)}
            onChange={this.props.onChange}
            className={fieldClasses}
          />
        );
        break;
      }
      case 'datepicker': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            component={renderDatePicker}
            className={fieldClasses}
            disabled={this.props.disabled}
          />
        );
        break;
      }
      case 'upload_file': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            zoneHeight={zoneHeight}
            internalPreview={internalPreview}
            disabled={this.props.disabled}
            previewUrl={previewUrl}
            onUpload={onUpload}
            component={renderSingleFileInput}
            lang={lang}
          />
        );
        break;
      }
      case 'upload_avatar': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            zoneHeight={zoneHeight}
            internalPreview={internalPreview}
            disabled={this.props.disabled}
            previewUrl={previewUrl}
            onUpload={onUpload}
            component={cropImageInput}
            onFileRemoved={onFileRemoved}
            scaleWidth={this.props.scaleWidth}
            scaleHeight={this.props.scaleHeight}
          />
        );
        break;
      }
      case 'multi_select': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            disabled={this.props.disabled}
            component={renderMultiSelect(options, selectedValues)}
            className={fieldClasses}
          />
        );
        break;
      }
      case 'custom_textarea': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            rows={rows}
            disabled={this.props.disabled}
            component={renderTextAreaField}
            className={fieldClasses}
          />
        );
        break;
      }
      case 'rich_text_editor': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            disabled={this.props.disabled}
            component={renderRichTextEditor}
            className={customClassName}
          />
        );
        break;
      }
      case 'currency_input': {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            type={type}
            disabled={this.props.disabled}
            component={renderCurrencyField}
            onChange={this.props.onChange}
            customClassName={fieldClasses}
            normalize={normalizeCurrency}
          />
        );
        break;
      }
      default: {
        fieldComponent = (
          <Field
            name={formControlName}
            placeholder={placeholder}
            component={typeField}
            disabled={this.props.disabled}
            className={fieldClasses}
          />
        );
      }
    }
    return fieldComponent;
  }
}

FormField.propTypes = {
  formControlName: React.PropTypes.string.isRequired,
  typeField: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  zoneHeight: React.PropTypes.string,
  fieldLabel: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onFileRemoved: React.PropTypes.func,
  isMandatoryField: React.PropTypes.bool,
  customClassName: React.PropTypes.string
};

export default cssModules(FormField, styles);
