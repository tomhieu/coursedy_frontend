import React, { Component } from 'react';
import './TermOfUse.scss';
import './Items.scss';
import PageContainer from '../../utils/PageContainer';

class TermsContainer extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('terms_page') }}
      >
        <div className="terms-of-use">
          <div className="container">
            <TermOfUseTop context={this.context} />
            <TermOfUseCenter context={this.context} />
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

const TermOfUseTop = ({ context }) => {
  return (
    <div className="items__heading">
      <h1 className="items__title">{context.t('terms_title')}</h1>
      <div className="divider" />
      <p><strong>{context.t('terms_latest_update')}</strong></p>
      <p>{context.t('terms_description')}</p>
    </div>
  );
};

const TermOfUseCenter = ({ context }) => {
  return (
    <div className="items__main">
      {context.t('terms').map((term, index) => {
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
