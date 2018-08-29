import React from 'react';
import ForgotPasswordFormContainer from 'containers/Auth/ForgotPasswordFormContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';


const ForgotPassword = props => (
  <PageContainer>
    <div className="mt-40">
      <div className="mb-50">
        <LoadingMask placeholderId="forgotPasswordPlaceholder">
          <ForgotPasswordFormContainer {...props} />
        </LoadingMask>
      </div>
    </div>
  </PageContainer>
);

export default ForgotPassword;
