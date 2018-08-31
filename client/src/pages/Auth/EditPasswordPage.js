import React, { Component } from 'react';
import EditPasswordFormContainer from 'containers/Auth/EditPasswordFormContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

class EditPasswordPage extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('edit_password_page') }}
      >
        <div className="mt-50 mb-50">
          <LoadingMask placeholderId="editPasswordPlaceholder">
            <EditPasswordFormContainer {...this.props} />
          </LoadingMask>
        </div>
      </PageContainer>
    );
  }
}


EditPasswordPage.contextTypes = {
  t: React.PropTypes.func.isRequired
}
export default EditPasswordPage;
