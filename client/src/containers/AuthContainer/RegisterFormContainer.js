import React, { PropTypes, Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as AmazingActionCreators from '../../actions/amazingComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RegisterFormContainer extends Component {
  render() {
    return (
      <div className="sign-block">
        <h2><span> {this.context.t("register")} </span> {this.context.t("new_account")} </h2>
        <span className="error"/>
        <RegisterForm/>
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
  actions: bindActionCreators(AmazingActionCreators, dispatch)
});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent);
