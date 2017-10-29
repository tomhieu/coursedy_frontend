import React, {Component} from 'react'
import {ControlLabel, FormGroup} from 'react-bootstrap';
import {Field} from 'redux-form';
import {
    renderDatePicker, renderField, renderMultiSelect, renderSelect,
    renderSingleFileInput
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
            <FormGroup controlId="formGroupId" className={styles.fieldMargin}>
                <ControlLabel> {this.props.formLabel} {this.props.isMandatoryField && <span color="red">*</span>} </ControlLabel>
                <div className="dark-picker dark-picker-bright">
                    {fieldComponent}
                </div>
            </FormGroup>
        )
    }

    buildFieldRender(props) {
        let fieldComponent;

        switch (props.typeField) {
            case "custom_input": {
                fieldComponent = <Field name={this.props.formControlName} placeholder={this.props.placeholder} component={renderField} className="form-control" />;
                break;
            }
            case "custom_select": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder}
                                        component={renderSelect(props.options)} className="form-control"/>;
                break;
            }
            case "datepicker": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} component={renderDatePicker}
                           className="form-control"/>;
                break;
            }
            case "upload_file": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder} zoneHeight="200px"
                                        onUpload={this.props.onUpload} component={renderSingleFileInput}/>
                break;
            }
            case "multi_select": {
                fieldComponent = <Field name={props.formControlName} placeholder={props.placeholder}
                                        component={renderMultiSelect(props.options, props.selectedValues)} className="form-control"/>
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