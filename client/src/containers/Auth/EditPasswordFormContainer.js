import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePasswordContainer from 'containers/Account/ChangePasswordContainer';
import { editPassword } from '../../actions/SessionActionCreator';


class EditPasswordFormContainer extends Component {
  componentWillMount() {
    this.props.autoLogin();
  }

  render() {
    return (
      <div className="sign-block">
        <ChangePasswordContainer updateWithoutPassword />
      </div>
    );
  }
}

EditPasswordFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  autoLogin: email => dispatch(editPassword()),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(EditPasswordFormContainer);
