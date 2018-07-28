import React from 'react'
import EditPasswordFormContainer from 'containers/Auth/EditPasswordFormContainer'
import LoadingMask from 'components/LoadingMask/LoadingMask'


const EditPasswordPage = (props) => (
  <div className="mt-20">
    <div className='mb-50'>
      <LoadingMask placeholderId="editPasswordPlaceholder">
        <EditPasswordFormContainer {...props} />
      </LoadingMask>
    </div>
  </div>
);

export default EditPasswordPage
