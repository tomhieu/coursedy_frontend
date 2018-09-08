import React, { Component } from 'react';

class FQAContact extends Component {
  render() {
    return (
      <div className="fqa__contact">
        <p>{this.context.t('fqa_still_looking_for')}</p>
        <a href={`mailto:${this.context.t('product_contact_email')}`} className="button button-border-blue">{this.context.t('contact_the_team')}</a>
      </div>
    );
  }
}

FQAContact.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default FQAContact;
