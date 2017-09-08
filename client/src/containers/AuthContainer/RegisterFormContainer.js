import React, { Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as SignUpComponent from '../../actions/SignUpComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reduxForm} from 'redux-form';

class RegisterFormContainer extends Component {
  signUpUser({email, password}) {
    console.log(email);
    this.props.actions.signUpUser();
  }

  render() {
    return (
      <div className="sign-block">
        <h2><span> {this.context.t("register")} </span> {this.context.t("new_account")} </h2>
        <span className="error"/>
        <RegisterForm onSubmit={this.signUpUser.bind(this)} {...this.props}/>
      </div>
    );
  }
}

RegisterFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(SignUpComponent, dispatch)
});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( reduxForm({
  form: 'signUp',
  fields: ['email', 'password']
})(StyledComponent));