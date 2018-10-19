import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CoursedyHelmet from '../components/CoursedyHelmet';


class PageContainer extends Component {
  static propTypes = {
    error: PropTypes.object,
    children: PropTypes.object.isRequired,
    meta: PropTypes.object,
    req: PropTypes.object,
    location: PropTypes.object,
    staticContext: PropTypes.object
  };

  static defaultProps = {
    meta: {}
  };

  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  render() {
    const {
      req, location, error = {}, meta = {}, children
    } = this.props;
    const { status } = error || {};
    return (
      <div>
        <CoursedyHelmet
          schema={meta.schema || 'WebPage'}
          title={`${meta.title || ''}${meta.page ? ` - ${this.context.t('page')} ` : ''}${meta.page || ''}`}
          keywords={meta.keywords}
          description={meta.description}
          url={`${req.protocol}://${req.host}${location.pathname}`}
          tags={meta.tags}
        />
        {
          status === 404 || status === 410 ? (
            <NotFoundPage />) : children
        }
      </div>
    );
  }
}


export default connect(
  state => ({ req: state.requestInfo }),
  null
)(withRouter(PageContainer));
