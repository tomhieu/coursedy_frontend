import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import * as React from "react";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import styles from './ChangePassword.module.scss';
import cssModules from 'react-css-modules';
import {updatePassword} from "../../../actions/TutorAccountService";

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
                <span className="text-uppercase ml-15 mr-15">{this.context.t("account_tutor_password_title")}</span>
                <form onSubmit={e => updatePassword(e.target.value)}>
                    <div>
                        <FormField formGroupId="currentPasswordId" formLabel={this.context.t("account_tutor_current_password_title")} formControlName="currentPassword" typeField="custom_input"/>
                    </div>

                    <div>
                        <FormField formGroupId="newPasswordId" formLabel={this.context.t("account_tutor_new_password_title")} formControlName="newPassword" typeField="custom_input"/>
                    </div>

                    <div>
                        <FormField formGroupId="newPassword2Id" formLabel={this.context.t("account_tutor_new_password_again_title")} formControlName="newPassword2" typeField="custom_input"/>
                    </div>

                    <div>
                        <button type="submit" className="ml-15 mr-15 mt-15">{this.context.t("account.person.info.save.btn")}</button>
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
};

export default connect(mapStateToProps)( reduxForm({
    form: 'changePasswordForm',
    fields: ['currentPassword', 'newPassword', 'newPassword2']
})(cssModules(ChangePassword, styles)));