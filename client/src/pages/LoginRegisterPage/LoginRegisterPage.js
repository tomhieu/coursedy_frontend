import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import {LoginFormContainer} from '../../containers/index';
import LoadingMask from "../../components/LoadingMask/LoadingMask";

const LoginRegisterForm = (props) => (
  <div className='login-register'>
    <div className='mb-50'>
      <LoadingMask placeholderId="loginPlaceholder" isFullLoading={true}>
        <LoginFormContainer {...props} />
      </LoadingMask>
    </div>
  </div>
);

export default cssModules(LoginRegisterForm, styles);
