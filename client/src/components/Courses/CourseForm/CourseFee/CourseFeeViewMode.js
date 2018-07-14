import * as React from "react";
import {Component} from "react";
import ReadOnlyField from "../../../Core/ReadOnlyField";
import ObjectUtils from "utils/ObjectUtils";

class CourseFeeViewMode extends Component {
  render() {
    const {tuitionFee, currency, onEditFormField} = this.props;
    return (
      <div className="row">
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <ReadOnlyField fieldLabel={this.context.t("tuition_fee")}
                         showEditFormField={onEditFormField}
                         activatedFields={['tuition_fee_Id', 'currency_Id']}
                         content={ObjectUtils.currencyFormat(tuitionFee, currency)}/>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <ReadOnlyField fieldLabel={this.context.t("tuition_currency")}
                         showEditFormField={onEditFormField}
                         activatedFields={['tuition_fee_Id', 'currency_Id']}
                         content={currency}/>
        </div>
      </div>
    )
  }
}

CourseFeeViewMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFeeViewMode.propType = {
  tuitionFee: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  onEditFormField: React.PropTypes.func.isRequired
}

export default CourseFeeViewMode;