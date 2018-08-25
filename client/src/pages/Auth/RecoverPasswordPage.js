import React from 'react';
import RecoverPasswordContainer from 'containers/Auth/RecoverPasswordContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';


const RecoverPassword = props => (
  <div className="mt-20">
    <div className="mb-50">
      <LoadingMask placeholderId="recoverPasswordPlaceholder">
        <RecoverPasswordContainer {...props} />
      </LoadingMask>
    </div>
  </div>
);

export default RecoverPassword;
