import React, { Component } from 'react';
import coursedyWork from 'containers/HowCoursedyWorks';
import PageContainer from '../../utils/PageContainer';
import './HowCoursedyWorkDetail.scss';

class HowCoursedyWorkDetailContainer extends Component {
  render() {
    const { params: { slug } } = this.props.match;
    const status = !coursedyWork[slug] ? 404 : undefined;
    let CoursedyWorkDetail = null;
    if (status !== 404) {
      CoursedyWorkDetail = coursedyWork[slug];
    }

    return (
      <PageContainer error={{ status }}>
        { status !== 404 ?
          <CoursedyWorkDetail /> : null
        }
      </PageContainer>
    );
  }
}

HowCoursedyWorkDetailContainer.propTypes = {
  match: React.PropTypes.object,
}

HowCoursedyWorkDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
};

export default HowCoursedyWorkDetailContainer;
