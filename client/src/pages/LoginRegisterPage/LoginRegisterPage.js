import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginRegisterPage.module.scss';
import { LoginFormContainer } from '../../containers/index';
import { RegisterFormContainer } from '../../containers/index';

const LoginRegisterForm = (props) => (
  <div className='login-register d-flex flex-auto'>
    <div className='container'>
      <div className='row row-padding'>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <LoginFormContainer {...props} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <RegisterFormContainer {...props} />
        </div>
      </div>
    </div>
  </div>
);

export default cssModules(LoginRegisterForm, styles);
