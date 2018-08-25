import * as React from 'react';
import { Component } from 'react';
import ObjectUtils from 'utils/ObjectUtils';
import CourseFormItem from '../CourseFormItem';

class CourseFeeViewMode extends Component {
  render() {
    const {
      editMode, tuitionFee, currency, onEditFormField, concurrency
    } = this.props;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <CourseFormItem
            editMode={editMode}
            fieldId="tuition_fee"
            fieldLabel={this.context.t('tuition_fee')}
            placeholder={this.context.t('tuition_fee')}
            isMandatory
            fieldName="tuition_fee"
            typeField="custom_input"
            content={editMode && tuitionFee ? ObjectUtils.currencyFormat(tuitionFee, currency) : ''}
            styleCustomField="inline-form-control"
            {...this.props}
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <CourseFormItem
            editMode={editMode}
            fieldId="currency"
            fieldLabel={this.context.t('tuition_currency')}
            placeholder={this.context.t('tuition_currency')}
            isMandatory
            fieldName="currency"
            typeField="custom_select"
            content={editMode && currency ? currency : ''}
            options={concurrency}
            styleCustomField="inline-form-control"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

CourseFeeViewMode.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseFeeViewMode.propType = {
  editMode: React.PropTypes.bool.isRequired,
  tuitionFee: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  onEditFormField: React.PropTypes.func.isRequired,
  concurrency: React.PropTypes.array
};

export default CourseFeeViewMode;
