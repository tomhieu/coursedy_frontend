import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import { RegisterFormContainer } from '../../containers/index';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

const RegisterForm = props => (
  <PageContainer>
    <div className="login-register">
      <div className="mb-50">
        <LoadingMask placeholderId="registerPlaceholder">
          <RegisterFormContainer {...props} />
        </LoadingMask>
      </div>
    </div>
  </PageContainer>
);

export default cssModules(RegisterForm, styles);
