import React, { Component } from 'react';
import AboutTop from '../../components/Layout/SubAbout/AboutTop';
import './AboutUs.scss';
import AboutCenter from '../../components/Layout/SubAbout/AboutCenter';

class AboutUsContainer extends Component {
  render() {
    return (
      <div className="about-us">
        <AboutTop />
        <AboutCenter />
      </div>
    );
  }
}

AboutUsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default AboutUsContainer;
