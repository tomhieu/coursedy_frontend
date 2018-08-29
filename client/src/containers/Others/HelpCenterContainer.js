import React, { Component } from 'react';
import HelpCenterFQA from '../../components/Layout/SubHelpCenter/HelpCenterFQA';
import './HelpCenter.scss';
import PageContainer from '../../utils/PageContainer';

class HelpCenterContainer extends Component {
  render() {
    return (
      <PageContainer>
        <div className="help-center">
          <div className="container">
            <HelpCenterFQA />
          </div>
        </div>
      </PageContainer>
    );
  }
}

HelpCenterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default HelpCenterContainer;
