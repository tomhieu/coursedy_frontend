import React, { Component } from 'react';
import './Privacy.scss';
import './Items.scss';
import { Blocks } from './TermsContainer';
import PageContainer from '../../utils/PageContainer';

class PrivacyContainer extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('privacy_page') }}
      >
        <div className="terms-privacy">
          <div className="container">
            <PrivacyTop context={this.context} />
            <PrivacyCenter context={this.context} />
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

const PrivacyTop = ({ context }) => {
  return (
    <div className="items__heading">
      <h1 className="items__title">{context.t('terms_privacy_title')}</h1>
      <div className="divider" />
      <p><strong>{context.t('terms_privacy_update')}</strong></p>
      <p>{context.t('terms_privacy_description')}</p>
    </div>
  );
};

const PrivacyCenter = ({ context }) => {
  return (
    <div className="items__main">
      {context.t('privacies').map((term, index) => {
        return <Blocks term={term} key={index} />;
      })}
    </div>
  );
};
