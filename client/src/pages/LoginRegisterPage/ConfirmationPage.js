import React from 'react';
import ConfirmationContainer from '../../containers/Auth/ConfirmationContainer';
import PageContainer from '../../utils/PageContainer';

class ConfirmationPage extends React.Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('confirmation_page') }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mt-20" style={{ height: '60vh' }}>
              <ConfirmationContainer {...this.props} />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}


ConfirmationPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};
export default ConfirmationPage;
