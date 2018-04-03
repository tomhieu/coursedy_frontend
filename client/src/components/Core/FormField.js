import React, {Component} from "react";
import {ControlLabel, FormGroup} from "react-bootstrap";
import {Field} from "redux-form";
import {
  CustomTimePicker,
  renderCheckbox,
  renderDatePicker,
  renderField,
  renderMultiSelect,
  renderSelect,
  renderSingleFileInput,
  renderTextAreaField,
  renderToggle
} from "./CustomComponents";
import styles from "./FormField.module.scss";
import cssModules from "react-css-modules";
import {Checkbox, RadioButtonGroup, TimePicker} from 'redux-form-material-ui'
import {mStyles} from "utils/CustomStylesUtil";

class FormField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      formControlName, fieldLabel, showLabel = true, placeholder, isMandatoryField = false,
      typeField, type, zoneHeight = "auto", internalPreview = false, previewUrl, onUpload, rows, options,
      selectedValues, customClassName = "form-control", checked, chosenValue, onCheck, toggled, onToggle
    } = this.props;

    let fieldComponent = this.buildFieldRender(formControlName, placeholder, typeField, type,
      zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, checked, onCheck, toggled, onToggle);
    return (
      <FormGroup controlId={this.props.fieldId}>
        {
          showLabel ? (
            <ControlLabel> {fieldLabel} {isMandatoryField && <span className="red">*</span>} </ControlLabel>) : ''
        }
        <div className="dark-picker dark-picker-bright">
          {fieldComponent}
        </div>
      </FormGroup>
    )
  }

  buildFieldRender(formControlName, placeholder, typeField, type, zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName, checked, chosenValue, onCheck, toggled, onToggle) {
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
      case "custom_select": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder} disabled={this.props.disabled}
                                component={renderSelect(options)} className={customClassName}/>;
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

      case "checkbox": {
        fieldComponent = <Field name={formControlName} label={this.props.fieldLabel}
                                iconStyle={this.props.iconStyle} disabled={this.props.disabled}
                                component={renderCheckbox} className={customClassName}/>
        break;
      }
      case "radiobox": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                rows={rows} label={this.props.fieldLabel}
                                disabled={this.props.disabled} component={RadioButtonGroup}
                                className={customClassName}/>
        break;
      }
      case "toggle": {
        fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                rows={rows} disabled={this.props.disabled}
                                component={renderToggle(toggled, onToggle)} className={customClassName}/>
        break;
      }
      case "timePicker": {
        fieldComponent = <Field name={formControlName} label={this.props.fieldLabel}
                                component={CustomTimePicker} format={null}
                                disabled={this.props.disabled} hintText={placeholder}/>
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
  fieldId: React.PropTypes.string.isRequired
};

export default cssModules(FormField, styles);