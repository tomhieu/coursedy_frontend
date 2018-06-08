import React, {Component} from 'react'


class AboutTop extends Component {
  render() {
    return (
      <div className="about-us__top">
        <div className="about-us__cover">
          <img src="/about-us/about-us-bg.svg" />
        </div>

        <div className="our-story">
          <h2>{this.context.t('our-story-title')}</h2>
          <div className="divider"></div>
          <p className="our-story__description">
            {this.context.t('our-story-description')}
          </p>
        </div>

        <div className="about-us-card-wrap">
          <div className="mr-0 ml-0 row flex-g1">
            <div className="col-12 col-sm-12 col-md-0 col-lg-2"></div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
              <WhoWeAreCard />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
              <WhatWeDoCard />
            </div>
            <div className="col-12 col-sm-12 col-md-0 col-lg-2"></div>
          </div>
        </div>
      </div>
    )
  }
}

AboutTop.contextTypes = {
  t: React.PropTypes.func.isRequired
}


class WhoWeAreCard extends Component {
  render() {
    return (
      <div className="about-us-card">
        <div className="about-us-card__icon">
          <img src="/about-us/our-team.svg" />
        </div>
        <div className="about-us-card__label">
          {this.context.t('whoweare-label')}
        </div>
        <p>{this.context.t('whoweare-description')}</p>
      </div>
    )
  }
}

WhoWeAreCard.contextTypes = {
  t: React.PropTypes.func.isRequired
}

class WhatWeDoCard extends Component {
  render() {
    return (
      <div className="about-us-card">
        <div className="about-us-card__icon">
          <img src="/about-us/student.svg" />
        </div>
        <div className="about-us-card__label">
          {this.context.t('whatwedo-label')}
        </div>
        <p>{this.context.t('whatwedo-description')}</p>
      </div>
    )
  }
}

WhatWeDoCard.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default AboutTop
