import React, { Component } from 'react';
import './Privacy.scss';
import './Items.scss';
import { TT } from 'utils/locale';
import { Blocks } from './TermsContainer';

class PrivacyContainer extends Component {
  render() {
    return (
      <PageContainer>
        <div className="terms-privacy">
          <div className="container">
            <PrivacyTop />
            <PrivacyCenter />
          </div>
        </div>
      </PageContainer>
    );
  }
}

PrivacyContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default PrivacyContainer;

const PrivacyTop = () => {
  return (
    <div className="items__heading">
      <h1 className="items__title">{TT.t('terms_privacy_title')}</h1>
      <div className="divider" />
      <p><strong>{TT.t('terms_privacy_update')}</strong></p>
      <p>{TT.t('terms_privacy_description')}</p>
    </div>
  );
};

const PrivacyCenter = () => {
  return (
    <div className="items__main">
      {TT.t('privacies').map((term, index) => {
        return <Blocks term={term} key={index} />;
      })}
    </div>
  );
};
