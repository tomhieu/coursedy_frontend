import React from 'react';
import EditPasswordFormContainer from 'containers/Auth/EditPasswordFormContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';


const EditPasswordPage = props => (
  <PageContainer>
    <div className="mt-50 mb-50">
      <LoadingMask placeholderId="editPasswordPlaceholder">
        <EditPasswordFormContainer {...props} />
      </LoadingMask>
    </div>
  </PageContainer>
);

export default EditPasswordPage;
