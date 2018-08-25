import React from 'react';
import EditPasswordFormContainer from 'containers/Auth/EditPasswordFormContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';


const EditPasswordPage = props => (
  <div className="mt-50 mb-50">
    <LoadingMask placeholderId="editPasswordPlaceholder">
      <EditPasswordFormContainer {...props} />
    </LoadingMask>
  </div>
);

export default EditPasswordPage;
