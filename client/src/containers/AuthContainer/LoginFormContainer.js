import React, { PropTypes, Component } from 'react';
import { LoginForm } from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as AmazingActionCreators from '../../actions/amazingComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Containers are used for managing state.
// Whenever possible, write components as stateless functional
// components and use classes for stateful containers.
// There is also likely too much state here.  The form
// Input elements can be managed by redux form, for example.
class LoginFormContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleAddItem = this.handleAddItem.bind(this);
  //   this.handleRemoveItem = this.handleRemoveItem.bind(this);
  // }
  // handleAddItem(content) {
  //   const {
  //     actions
  //   } = this.props;
  //   actions.addBox(content);
  // }
  // handleRemoveItem(id) {
  //   const {
  //     actions
  //   } = this.props;
  //   actions.removeBox(id);
  // }
  render() {
    return (
      <div className="sign-block signin-left">
        <h2><span>{this.context.t('login')}</span> {this.context.t('with_your_account')}</h2>
        <span className="error"/>
        <LoginForm/>
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
)(StyledComponent);
