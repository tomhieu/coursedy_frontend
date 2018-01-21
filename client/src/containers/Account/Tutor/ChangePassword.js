import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import * as React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import styles from './ChangePassword.module.scss';
import cssModules from 'react-css-modules';
import {updatePassword} from "../../../actions/TutorAccountActionCreator";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updatePassword({currentPassword, newPassword, newPassword2}) {
    this.props.dispatch(updatePassword({currentPassword, newPassword, newPassword2}));
  }

  render() {
    return (
      <div className="col-md-12 col-sm-12">
        <div className="block-title">
          <span className="text-uppercase bold">{this.context.t("account_tutor_password_title")}</span>
        </div>
        <form onSubmit={e => updatePassword(e.target.value)}>
          <div>
            <FormField formGroupId="currentPasswordId"
                       formLabel={this.context.t("account_tutor_current_password_title")}
                       formControlName="currentPassword" type="password" typeField="custom_input" {...this.props}/>
          </div>

          <div>
            <FormField formGroupId="newPasswordId" formLabel={this.context.t("account_tutor_new_password_title")}
                       formControlName="newPassword" type="password" typeField="custom_input"/>
          </div>

          <div>
            <FormField formGroupId="newPassword2Id" formLabel={this.context.t("account_tutor_new_password_again_title")}
                       formControlName="newPassword2" type="password" typeField="custom_input"/>
          </div>

          <div className='form-group'>
            <button type="submit"
                    className="mt-15 btn-link-dark">{this.context.t("account_tutor_new_password_btn")}</button>
          </div>
        </form>
      </div>
    )
  }
};

ChangePassword.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(reduxForm({
  form: 'changePasswordForm',
  fields: ['currentPassword', 'newPassword', 'newPassword2']
})(cssModules(ChangePassword, styles)));