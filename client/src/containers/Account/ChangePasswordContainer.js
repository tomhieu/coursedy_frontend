import * as React from "react";
import {Component} from "react";
import FormField from "../../components/Core/FormField";
import {connect} from "react-redux";
import {reduxForm, reset} from "redux-form";
import styles from './ChangePasswordContainer.module.scss';
import cssModules from 'react-css-modules';
import * as AccountActions from "../../actions/AccountActionCreator";
import {validate} from '../../validations/ChangePasswordFormValidator'
import Notice from "components/PopupMessage/Notice";
import PrimaryButton from "../../components/Core/PrimaryButton/PrimaryButton";
import Network from "../../utils/network";
import * as asyncAction from "../../actions/AsyncActionCreator";

class ChangePasswordContainer extends Component {
  updatePassword({current_password, password, password_confirmation}) {
    this.props.dispatch(AccountActions.updatePassword({current_password, password, password_confirmation}));
    this.props.dispatch(reset('changePasswordForm'))
  }

  resetForm() {
    this.props.dispatch(AccountActions.resetUpdatePasswordForm())
  }

  render() {
    const {handleSubmit, passwordUpdated, updateWithoutPassword, errors} = this.props;
    return (
      <div className='row'>
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account_tutor_password_title")}</span>
          </div>

          <div className={errors ? 'd-block' : 'd-none'}>
            <span className="error">
              <div className="alert alert-danger">
                <a href="#" className="close" onClick={(e) => {
                  e.preventDefault()
                  this.props.clearError()
                }}>×</a>
                <p className="error">{errors && errors[0]}</p>
              </div>
            </span>
          </div>

          <form onSubmit={handleSubmit(this.updatePassword.bind(this))}>
            {
              updateWithoutPassword ? null :
                (<div>
                  <FormField fieldId="currentPasswordId"
                             fieldLabel={this.context.t("account_tutor_current_password_title")}
                             formControlName="current_password" type="password"
                             typeField="custom_input" {...this.props}/>
                </div>)
            }

            <div>
              <FormField fieldId="newPasswordId" fieldLabel={this.context.t("account_tutor_new_password_title")}
                         formControlName="password" type="password" typeField="custom_input"/>
            </div>

            <div>
              <FormField fieldId="newPassword2Id" fieldLabel={this.context.t("account_tutor_new_password_again_title")}
                         formControlName="password_confirmation" type="password" typeField="custom_input"/>
            </div>

            <div className='form-group'>
              <PrimaryButton isPrimary={true} line={false}
                             type="submit"
                             title={this.context.t("account_tutor_new_password_btn")}>
              </PrimaryButton>
            </div>
          </form>
          <Notice title={this.context.t("update_password")}
                  message={this.context.t("update_password_success")}
                  show={passwordUpdated}
                  closePopup={this.resetForm.bind(this)}/>
        </div>
      </div>
    )
  }
};

ChangePasswordContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(AccountActions.clearPasswordError())
})

const mapStateToProps = (state) => ({
  passwordUpdated: state.AccountReducer.passwordUpdated,
  errors: state.AccountReducer.passwordErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'changePasswordForm',
  fields: ['current_password', 'password', 'password_confirmation'],
  validate
})(cssModules(ChangePasswordContainer, styles)));