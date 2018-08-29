import React from 'react';
import RecoverPasswordContainer from 'containers/Auth/RecoverPasswordContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';


const RecoverPassword = props => (
  <PageContainer>
    <div className="mt-20">
      <div className="mb-50">
        <LoadingMask placeholderId="recoverPasswordPlaceholder">
          <RecoverPasswordContainer {...props} />
        </LoadingMask>
      </div>
    </div>
  </PageContainer>
);

export default RecoverPassword;
