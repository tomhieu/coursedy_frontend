import React, { Component } from 'react';
import './TermOfUse.scss';
import './Items.scss';
import { TT } from 'utils/locale';

class TermsContainer extends Component {
  render() {
    return (
      <PageContainer>
        <div className="terms-of-use">
          <div className="container">
            <TermOfUseTop />
            <TermOfUseCenter />
          </div>
        </div>
      </PageContainer>
    );
  }
}

TermsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default TermsContainer;

const TermOfUseTop = () => {
  return (
    <div className="items__heading">
      <h1 className="items__title">{TT.t('terms_title')}</h1>
      <div className="divider" />
      <p><strong>{TT.t('terms_latest_update')}</strong></p>
      <p>{TT.t('terms_description')}</p>
    </div>
  );
};

const TermOfUseCenter = () => {
  return (
    <div className="items__main">
      {TT.t('terms').map((term, index) => {
        return <Blocks term={term} key={index} />;
      })}
    </div>
  );
};

export const Blocks = ({ term }) => {
  return (
    <div>
      <h4>{term.heading}</h4>
      <BlockList term={term} />
      <BlockDescription term={term} />
    </div>
  );
};

export const BlockList = ({ term }) => {
  return (
    term.items.length ? (
      <ul>
        {term.items.map((term, index) => {
          return (
            <li key={index}>
              {term.content}
              {term.child_content
                ? <BlockList term={term.child_content} /> : null
            }
            </li>
          );
        })}
      </ul>
    ) : null
  );
};

export const BlockDescription = ({ term }) => {
  return (
    term.description ? (
      <p>
        {term.description}
      </p>
    ) : null
  );
};
