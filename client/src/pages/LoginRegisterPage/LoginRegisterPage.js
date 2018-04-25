import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import {LoginFormContainer, RegisterFormContainer} from '../../containers/index';
import LoadingMask from "../../components/LoadingMask/LoadingMask";

const LoginRegisterForm = (props) => (
  <div className='login-register d-flex flex-auto'>
    <div className='container'>
      <div className='row row-padding'>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <LoadingMask placeholderId="loginPlaceholder" isFullLoading={true}>
            <LoginFormContainer {...props} />
          </LoadingMask>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <LoadingMask placeholderId="registerPlaceholder">
            <RegisterFormContainer {...props} />
          </LoadingMask>
        </div>
      </div>
    </div>
  </div>
);

export default cssModules(LoginRegisterForm, styles);
