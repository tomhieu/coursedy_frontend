import {Component} from "react";
import FormField from "../../components/Core/FormField";
import * as React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import styles from './ChangePasswordContainer.module.scss';
import cssModules from 'react-css-modules';
import {updatePassword} from "../../actions/AccountActionCreator";
import {validate} from '../../validations/ChangePasswordFormValidator'

class ChangePasswordContainer extends Component {
  updatePassword({current_password, password, password_confirmation}) {
    this.props.dispatch(updatePassword({current_password, password, password_confirmation}));
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className='row'>
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account_tutor_password_title")}</span>
          </div>
          <form onSubmit={handleSubmit(this.updatePassword.bind(this))}>
            <div>
              <FormField fieldId="currentPasswordId"
                         fieldLabel={this.context.t("account_tutor_current_password_title")}
                         formControlName="current_password" type="password" typeField="custom_input" {...this.props}/>
            </div>

            <div>
              <FormField fieldId="newPasswordId" fieldLabel={this.context.t("account_tutor_new_password_title")}
                         formControlName="password" type="password" typeField="custom_input"/>
            </div>

            <div>
              <FormField fieldId="newPassword2Id" fieldLabel={this.context.t("account_tutor_new_password_again_title")}
                         formControlName="password_confirmation" type="password" typeField="custom_input"/>
            </div>

            <div className='form-group'>
              <button type="submit" className="mt-15 btn-link-dark">{this.context.t("account_tutor_new_password_btn")}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

ChangePasswordContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(reduxForm({
  form: 'changePasswordForm',
  fields: ['current_password', 'password', 'password_confirmation'],
  validate
})(cssModules(ChangePasswordContainer, styles)));