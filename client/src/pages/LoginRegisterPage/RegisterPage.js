import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import { RegisterFormContainer } from '../../containers/index';
import LoadingMask from '../../containers/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';


class RegisterPage extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('register_page') }}
      >
        <div className="login-register">
          <div className="mb-50">
            <LoadingMask placeholderId="registerPlaceholder">
              <RegisterFormContainer {...this.props} />
            </LoadingMask>
          </div>
        </div>
      </PageContainer>
    );
  }
}


RegisterPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};
export default cssModules(RegisterPage, styles);
