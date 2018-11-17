import * as React from 'react';
import { Component } from 'react';
import ObjectUtils from 'utils/ObjectUtils';
import CourseFormItem from '../CourseFormItem';

class CourseFeeViewMode extends Component {
  render() {
    const {
      editMode, tuitionFee, currency, canEditable
    } = this.props;
    return (
      <div className="row">
        <div className="col-sm-12">
          <CourseFormItem
            editMode={editMode}
            fieldId="tuition_fee"
            fieldLabel={this.context.t('tuition_fee')}
            placeholder={this.context.t('tuition_fee')}
            isMandatory
            fieldName="tuition_fee"
            typeField="currency_input"
            content={editMode && tuitionFee ? ObjectUtils.currencyFormat(tuitionFee, currency) : ''}
            styleCustomField="inline-form-control"
            canEditable={canEditable}
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
  concurrency: React.PropTypes.array,
  canEditable: React.PropTypes.bool
};

export default CourseFeeViewMode;
