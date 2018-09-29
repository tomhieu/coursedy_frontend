import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import styles from './PersonInfoContainer.module.scss';
import { PersonalInfoForm } from '../../components/Account/Tutor/PersonalInfoForm';
import { AccountActions } from '../../actions/index';
import { validate } from '../../validations/PersonFormValidator';

class PersonInfoContainer extends Component {
  savePersonInfo({
    name, email, date_of_birth, address, gender, country_code, currency
  }) {
    this.props.dispatch(AccountActions.savePersonData(name, email, date_of_birth, address, gender, this.props.initialValues.email != email, country_code, currency));
  }


  render() {
    const placeholderId = "personInfoPlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t('account.person.info.title')}</span>
          </div>
          <PersonalInfoForm
            onSubmit={this.savePersonInfo.bind(this)}
            {...this.props}
            placeholderId={placeholderId}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    );
  }
}

PersonInfoContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default connect(state => ({
  initialValues: state.session.currentUser,
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
}))(reduxForm({
  form: 'personInfo',
  fields: ['name', 'email', 'address', 'date_of_birth', 'country_code', 'gender'],
  validate
})(cssModules(PersonInfoContainer, styles)));
