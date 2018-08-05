import React, {Component} from "react";
import {ControlLabel, FormGroup} from "react-bootstrap";
import {Field} from "redux-form";
import {
  renderCheckBoxField,
  renderRadioField,
  renderDatePicker, renderField, renderMultiSelect, renderSelect, renderSingleFileInput,
  renderTextAreaField,
} from "./CustomComponents";
import styles from "./FormField.module.scss";
import cssModules from "react-css-modules";
import {cropImageInput} from "components/Core/CustomComponents";

class FormField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formControlName, fieldLabel, showLabel = true, placeholder, isMandatoryField = false,
      typeField, type, zoneHeight = "auto", internalPreview = false, previewUrl, onUpload, rows, options,
      selectedValues, customClassName = "form-control", checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved
    } = this.props;

    let fieldComponent = this.buildFieldRender(formControlName, placeholder, typeField, type,
      zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved);
    return (
      <FormGroup controlId={this.props.fieldId}>
        {
          showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (
            <ControlLabel> {fieldLabel} {isMandatoryField && <span className="red">*</span>} </ControlLabel>) : ''
        }
        <div className="dark-picker dark-picker-bright">
          {fieldComponent}
        </div>
      </FormGroup>
    )
  }

  buildFieldRender(formControlName, placeholder, typeField, type, zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle, onFileRemoved) {
    let fieldComponent;

    switch (typeField) {
      case "hidden": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} component="input" className="hidden"/>;
        break;
      }
      case "custom_input": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                type={type} disabled={this.props.disabled}
                                component={renderField} onChange={this.props.onChange}
                                customClassName={customClassName}/>;
        break;
      }
      case "radio": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                type="checkbox" disabled={this.props.disabled}
                                label={this.props.fieldLabel}
                                component={renderRadioField} onChange={this.props.onChange}
                                customClassName={customClassName}/>;
        break;
      }
      case "checkbox": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                type="checkbox" disabled={this.props.disabled}
                                label={this.props.fieldLabel}
                                component={renderCheckBoxField} onChange={this.props.onChange}
                                customClassName={customClassName}/>;
        break;
      }
      case "custom_select": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} disabled={this.props.disabled}
                                component={renderSelect(options)} onChange={this.props.onChange} className={customClassName}/>;
        break;
      }
      case "datepicker": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} component={renderDatePicker}
                                className={customClassName} disabled={this.props.disabled} />;
        break;
      }
      case "upload_file": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} zoneHeight={zoneHeight}
                                internalPreview={internalPreview} disabled={this.props.disabled}
                                previewUrl={previewUrl} onUpload={onUpload} component={renderSingleFileInput}/>
        break;
      }
      case "upload_avatar": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} zoneHeight={zoneHeight}
                                internalPreview={internalPreview} disabled={this.props.disabled}
                                previewUrl={previewUrl} onUpload={onUpload} component={cropImageInput} onFileRemoved={onFileRemoved}
                                scaleWidth={this.props.scaleWidth}
                                scaleHeight={this.props.scaleHeight}/>
        break;
      }
      case "multi_select": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                disabled={this.props.disabled}
                                component={renderMultiSelect(options, selectedValues)}
                                className={customClassName}/>
        break;
      }
      case "custom_textarea": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                rows={rows} disabled={this.props.disabled}
                                component={renderTextAreaField} className={customClassName}/>
        break;
      }
      default: {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                component={typeField} disabled={this.props.disabled}
                                className={customClassName}/>;
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
};

export default cssModules(FormField, styles);