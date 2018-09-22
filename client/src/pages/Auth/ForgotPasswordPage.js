import React, { Component } from 'react';
import ForgotPasswordFormContainer from 'containers/Auth/ForgotPasswordFormContainer';
import LoadingMask from 'containers/LoadingMask/LoadingMask';
import PageContainer from '../../utils/PageContainer';

class ForgotPasswordPage extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('forgot_password_page') }}
      >
        <div className="mt-40">
          <div className="mb-50">
            <LoadingMask placeholderId="forgotPasswordPlaceholder">
              <ForgotPasswordFormContainer {...this.props} />
            </LoadingMask>
          </div>
        </div>
      </PageContainer>
    );
  }
}


ForgotPasswordPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};
export default ForgotPasswordPage;
