import * as React from "react";
import {Component} from "react";
import FormField from "../../../Core/FormField";
import {FormGroup} from "react-bootstrap";
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton";

class CourseFeeEditMode extends Component {
  render() {
    const {concurrency, pristine, submitting, onEditCourseFee} = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className='lg-field'>
                <FormField fieldId="tuition_fee_Id"
                           fieldLabel={this.context.t("tuition_fee")}
                           placeholder={this.context.t("tuition_fee")}
                           isMandatory={true}
                           formControlName="tuition_fee"
                           typeField="custom_input"
                           {...this.props}>
                </FormField>
              </div>
            </div>
            <div className="col-md-6">
              <div className='ml-10 currency-field'>
                <FormField fieldId="currency_Id"
                           fieldLabel={this.context.t("tuition_currency")}
                           isMandatory={true}
                           formControlName="currency"
                           typeField="custom_select"
                           options={concurrency}
                           styleCustomField="inline-form-control" {...this.props}>
                </FormField>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <FormGroup className="d-flex justify-content-right">
            <PrimaryButton type="submit" line={false}
                           disabled={pristine || submitting}
                           title={this.context.t("save")}>
            </PrimaryButton>
            <PrimaryButton type="button"
                           isPrimary={false}
                           customClasses="ml-15"
                           callback={onEditCourseFee}
                           title={this.context.t("cancel")}>
            </PrimaryButton>
          </FormGroup>
        </div>
      </div>
    )
  }
}

CourseFeeEditMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFeeEditMode.propType = {
  concurrency: React.PropTypes.array,
  onEditCourseFee: React.PropTypes.func
}

export default CourseFeeEditMode;