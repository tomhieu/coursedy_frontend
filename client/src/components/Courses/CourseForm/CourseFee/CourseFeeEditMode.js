import * as React from 'react';
import { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import FormField from '../../../Core/FormField';
import PrimaryButton from '../../../Core/PrimaryButton/PrimaryButton';

class CourseFeeEditMode extends Component {
  render() {
    const {
      concurrency, pristine, submitting, onEditCourseFee
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="lg-field">
            <FormField
              fieldId="tuition_fee"
              fieldLabel={this.context.t('tuition_fee')}
              placeholder={this.context.t('tuition_fee')}
              isMandatory
              formControlName="tuition_fee"
              typeField="currency_input"
              {...this.props}
            />
          </div>
        </div>
        <div className="col-md-12">
          <FormGroup className="d-flex justify-content-right">
            <PrimaryButton
              type="submit"
              isSmallButton
              line={false}
              disabled={pristine || submitting}
              title={this.context.t('save')}
            />
            <PrimaryButton
              type="button"
              isSmallButton
              isPrimary={false}
              customClasses="ml-15"
              callback={onEditCourseFee}
              title={this.context.t('cancel')}
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}

CourseFeeEditMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseFeeEditMode.propType = {
  concurrency: React.PropTypes.array,
  onEditCourseFee: React.PropTypes.func
};

export default CourseFeeEditMode;
