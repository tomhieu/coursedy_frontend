import React, {Component} from 'react'
import {ControlLabel, FormGroup} from 'react-bootstrap';
import {Field} from 'redux-form';
import {
    renderDatePicker, renderField, renderMultiSelect, renderSelect,
    renderSingleFileInput, renderTextAreaField
} from "../CustomComponents";
import styles from './FormField.module.scss';
import cssModules from 'react-css-modules';

class FormField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let fieldComponent = this.buildFieldRender(this.props);
        return (
            <FormGroup controlId="formGroupId">
                <ControlLabel> {this.props.formLabel} {this.props.isMandatoryField && <span className="red">*</span>} </ControlLabel>
                <div className="dark-picker dark-picker-bright">
                    {fieldComponent}
                </div>
            </FormGroup>
        )
    }

    buildFieldRender(props) {
        let fieldComponent;

        switch (props.typeField) {
            case "hidden": {
                fieldComponent = <Field name={this.props.formControlName} placeholder={this.props.placeholder} component="input" className="hidden" />;
                break;
            }
            case "custom_input": {
                fieldComponent = <Field name={this.props.formControlName} placeholder={this.props.placeholder} type={this.props.type} component={renderField} className="form-control" />;
                break;
            }
            case "custom_select": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder}
                                        component={renderSelect(props.options, props.onChange)} className="form-control"/>;
                break;
            }
            case "datepicker": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} component={renderDatePicker}
                           className="form-control"/>;
                break;
            }
            case "upload_file": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} zoneHeight="200px" internalPreview={this.props.internalPreview}
                                        previewUrl={props.previewUrl} onUpload={this.props.onUpload} component={renderSingleFileInput}/>
                break;
            }
            case "multi_select": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder}
                                        component={renderMultiSelect(props.options, props.selectedValues)} className="form-control"/>
                break;
            }
            case "custom_textarea": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} rows={props.rows}
                                        component={renderTextAreaField} className="form-control"/>
                break;
            }
            default: {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} component={props.typeField}
                           className="form-control"/>;
            }
        }
        return fieldComponent;
    }
}

export default cssModules(FormField, styles);