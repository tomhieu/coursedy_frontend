import React, { Component } from 'react';
import AboutTop from '../../components/Layout/SubAbout/AboutTop';
import './AboutUs.scss';
import AboutCenter from '../../components/Layout/SubAbout/AboutCenter';
import PageContainer from '../../utils/PageContainer';

class AboutUsContainer extends Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('about_page') }}
      >
        <div className="about-us">
          <AboutTop />
          <AboutCenter />
        </div>
      </PageContainer>
    );
  }
}

AboutUsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default AboutUsContainer;
