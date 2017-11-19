import React, {Component} from 'react'
import {ControlLabel, FormGroup} from 'react-bootstrap';
import {Field} from 'redux-form';
import {
    renderDatePicker, renderField, renderMultiSelect, renderSelect,
    renderSingleFileInput, renderTextAreaField
} from "./CustomComponents";
import styles from './FormField.module.scss';
import cssModules from 'react-css-modules';

class FormField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {formControlName, formLabel, showLabel = true, placeholder, isMandatoryField = false,
            typeField, type, zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName} = this.props;
        let fieldComponent = this.buildFieldRender(formControlName, placeholder, typeField, type,
            zoneHeight, internalPreview, previewUrl, onUpload, rows, options, selectedValues, customClassName);
        return (
            <FormGroup controlId="formGroupId">
                {
                    showLabel ? (<ControlLabel> {formLabel} {isMandatoryField && <span className="red">*</span>} </ControlLabel>) : ''
                }
                <div className="dark-picker dark-picker-bright">
                    {fieldComponent}
                </div>
            </FormGroup>
        )
    }

    buildFieldRender(formControlName, placeholder, typeField, type, zoneHeight = "200px", internalPreview = false, previewUrl, onUpload, rows, options, selectedValues, customClassName = "form-control") {
        let fieldComponent;

        switch (typeField) {
            case "hidden": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} component="input" className="hidden" />;
                break;
            }
            case "custom_input": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} type={type} component={renderField} customClassName={customClassName} />;
                break;
            }
            case "custom_select": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                        component={renderSelect(options)} className={customClassName}/>;
                break;
            }
            case "datepicker": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} component={renderDatePicker}
                                        className={customClassName}/>;
                break;
            }
            case "upload_file": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} zoneHeight={zoneHeight} internalPreview={internalPreview}
                                        previewUrl={previewUrl} onUpload={onUpload} component={renderSingleFileInput}/>
                break;
            }
            case "multi_select": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder}
                                        component={renderMultiSelect(options, selectedValues)} className={customClassName}/>
                break;
            }
            case "custom_textarea": {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} rows={rows}
                                        component={renderTextAreaField} className={customClassName}/>
                break;
            }
            default: {
                fieldComponent = <Field name={formControlName} placeholder={placeholder} component={typeField}
                                        className={customClassName}/>;
            }
        }
        return fieldComponent;
    }
}

FormField.propTypes = {
    formControlName: React.PropTypes.string.isRequired,
    typeField: React.PropTypes.string.isRequired
};

export default cssModules(FormField, styles);