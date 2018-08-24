import * as React from "react";
import {Component} from "react";
import {PersonalInfoForm} from "../../components/Account/Tutor/PersonalInfoForm";
import {reduxForm} from "redux-form";
import styles from './PersonInfoContainer.module.scss';
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import {dispatch} from "redux";
import {AccountActions} from "../../actions/index";
import {validate} from '../../validations/PersonFormValidator'

class PersonInfoContainer extends Component {
  savePersonInfo({name, email, date_of_birth, address, gender, country, currency}) {
    this.props.dispatch(AccountActions.savePersonData(name, email, date_of_birth, address, gender, this.props.initialValues.email != email,  country, currency));
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.person.info.title")}</span>
          </div>
          <PersonalInfoForm onSubmit={this.savePersonInfo.bind(this)} {...this.props} />
        </div>
      </div>
    )
  }
};

PersonInfoContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  initialValues: state.session.currentUser
}))(reduxForm({
  form: 'personInfo',
  fields: ['name', 'email', 'address', 'date_of_birth', 'country', 'currency'],
  validate
})(cssModules(PersonInfoContainer, styles)));
