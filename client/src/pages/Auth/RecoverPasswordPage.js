import React from 'react';
import RecoverPasswordContainer from 'containers/Auth/RecoverPasswordContainer';
import LoadingMask from 'components/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

class RecoverPasswordPage extends React.Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('recover_password_page') }}
      >
        <div className="mt-20">
          <div className="mb-50">
            <LoadingMask placeholderId="recoverPasswordPlaceholder">
              <RecoverPasswordContainer {...this.props} />
            </LoadingMask>
          </div>
        </div>
      </PageContainer>
    );
  }
}


RecoverPasswordPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};
export default RecoverPasswordPage;
