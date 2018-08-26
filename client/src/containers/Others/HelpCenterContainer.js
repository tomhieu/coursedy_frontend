import React, { Component } from 'react';
import HelpCenterFQA from '../../components/Layout/SubHelpCenter/HelpCenterFQA';
import './HelpCenter.scss';

class HelpCenterContainer extends Component {
  render() {
    return (
      <div className="help-center">
        <div className="container">
          <HelpCenterFQA />
        </div>
      </div>
    );
  }
}

HelpCenterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default HelpCenterContainer;
