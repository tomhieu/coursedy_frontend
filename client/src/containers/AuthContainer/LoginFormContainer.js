import React, { Component } from 'react';
import { LoginForm } from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as AmazingActionCreators from '../../actions/amazingComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reduxForm} from 'redux-form';

class LoginFormContainer extends Component {
  handleSubmit({email, password}){
    console.log(email, password)
  }

  render() {
    return (
      <div className="sign-block signin-left">
        <h2><span>{this.context.t('login')}</span> {this.context.t('with_your_account')}</h2>
        <span className="error"/>
        <LoginForm onSubmit={this.handleSubmit.bind(this)} {...this.props}/>
      </div>
    );
  }
}

LoginFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LoginFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AmazingActionCreators, dispatch)
});

const StyledComponent = cssModules(LoginFormContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(StyledComponent));
