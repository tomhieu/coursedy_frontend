import React from 'react';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import ConfirmationContainer from '../../containers/Auth/ConfirmationContainer';

const ConfirmationPage = props => (
  <div className="row">
    <div className="col-sm-12 mt-20" style={{ height: '100vh' }}>
      <LoadingMask placeholderId="loginPlaceholder" isFullLoading>
        <ConfirmationContainer {...props} />
      </LoadingMask>
    </div>
  </div>
);

export default ConfirmationPage;
