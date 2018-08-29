import React from 'react';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import ConfirmationContainer from '../../containers/Auth/ConfirmationContainer';
import PageContainer from '../../utils/PageContainer';

const ConfirmationPage = props => (
  <PageContainer>
    <div className="row">
      <div className="col-sm-12 mt-20" style={{ height: '100vh' }}>
        <LoadingMask placeholderId="loginPlaceholder" isFullLoading={true}>
          <ConfirmationContainer {...props} />
        </LoadingMask>
      </div>
    </div>
  </PageContainer>
);

export default ConfirmationPage;
