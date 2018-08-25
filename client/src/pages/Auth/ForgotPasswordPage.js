import React from 'react'
import ForgotPasswordFormContainer from 'containers/Auth/ForgotPasswordFormContainer'
import LoadingMask from 'components/LoadingMask/LoadingMask'


const ForgotPassword = (props) => (
  <div className="mt-40">
    <div className='mb-50'>
      <LoadingMask placeholderId="forgotPasswordPlaceholder">
        <ForgotPasswordFormContainer {...props} />
      </LoadingMask>
    </div>
  </div>
);

export default ForgotPassword
