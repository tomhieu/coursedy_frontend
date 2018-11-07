import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmUser } from 'actions/SessionActionCreator';
import { redirectToDashboard } from '../../actions/SessionActionCreator';


class ConfirmationContainer extends Component {
  componentWillMount() {
    this.props.confirm();
  }

  redirectUser() {
    this.props.redirectToDashboard(this.props.currentUser);
  }

  render() {
    const user = this.props.currentUser;
    return (
      <div className="row">
        <div className="col-sm-12">
          {
            user
              ? (
                <p>
                  {this.context.t('confirmed')}
                  {' '}
                  <a onClick={this.redirectUser.bind(this)}>
                    {' '}
                    {this.context.t('dashboard_page')}
                    {' '}
                  </a>
                </p>
              )
              : <p>{this.context.t('confirming')}</p>
          }
        </div>
      </div>
    );
  }
}

ConfirmationContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  confirm: () => dispatch(confirmUser()),
  redirectToDashboard: user => dispatch(redirectToDashboard(user))
});


export default connect(
  mapStateToProps, mapDispatchToProps
)(ConfirmationContainer);
