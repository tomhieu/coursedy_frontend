import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import { LoginFormContainer } from '../../containers/index';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

const LoginRegisterForm = props => (
  <PageContainer>
    <div className="login-register">
      <div className="mb-50">
        <LoadingMask placeholderId="loginPlaceholder" isFullLoading={true}>
          <LoginFormContainer {...props} />
        </LoadingMask>
      </div>
    </div>
  </PageContainer>
);

export default cssModules(LoginRegisterForm, styles);
