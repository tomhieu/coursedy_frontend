import React, { Component } from 'react';


class AboutTop extends Component {
  render() {
    return (
      <div className="about-us__top">
        <div className="our-story">
          <h2>{this.context.t('our-story-title')}</h2>
          <div className="divider" />
          <p className="our-story__description">
            {this.context.t('our-story-description')}
          </p>
        </div>
      </div>
    );
  }
}

AboutTop.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default AboutTop;
