import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import { LoginFormContainer } from '../../containers/index';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

class LoginRegisterPage extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('login_page') }}
      >
        <div className="login-register">
          <div className="mb-50">
            <LoadingMask placeholderId="loginPlaceholder" isFullLoading={true}>
              <LoginFormContainer {...this.props} />
            </LoadingMask>
          </div>
        </div>
      </PageContainer>
    );
  }
}


LoginRegisterPage.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default cssModules(LoginRegisterPage, styles);
