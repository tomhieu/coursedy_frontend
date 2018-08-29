import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CoursedyHelmet from '../components/CoursedyHelmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class PageContainer extends Component {
  static propTypes = {
    meta: PropTypes.object,
    req: PropTypes.object,
    status: PropTypes.number,
    location: PropTypes.object,
    staticContext: PropTypes.object
  };

  static defaultProps = {
    meta: {}
  };

  render() {
    const { req, location, error = {} } = this.props;
    const { status } = error;
    const meta = this.props.meta || {};

    return (
      <div>
        <CoursedyHelmet
          schema={meta.schema || "WebPage"}
          title={`${meta.title || ""}${
            meta.page ? " - Page " : ""
            }${meta.page || ""}`}
          keywords={meta.keywords}
          description={meta.description}
          url={`${req.protocol}://${req.host}${location.pathname}`}
          tags={meta.tags}
        />
        {
          status === 404 || status === 410 ? (
            <NotFoundPage />) : (
            this.props.children
          )
        }
      </div>
    );
  }
}


PageContainer.propTypes = {
  error: PropTypes.object,
  children: PropTypes.object.isRequired
};

export default connect(
  state => ({ req: state.requestInfo }),
  null
)(withRouter(PageContainer));
