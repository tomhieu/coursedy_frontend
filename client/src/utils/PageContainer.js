import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';


class PageContainer extends Component {
  render() {
    const { error } = this.props;
    if (error && error.status === 404) {
      return <NotFoundPage />;
    }
    return this.props.children;
  }
}


PageContainer.propTypes = {
  error: PropTypes.object,
  children: PropTypes.object.isRequired
};

export default PageContainer;
