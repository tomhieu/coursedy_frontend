import React, {Component} from 'react'
import AboutTop from '../../components/Layout/SubAbout/AboutTop'
import './AboutUs.scss'

class AboutUsContainer extends Component {
  render() {
    return (
      <div className="about-us full-width-in-container">
        <AboutTop />
      </div>
    )
  }
}

AboutUsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default AboutUsContainer
