import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ProductQuickLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <h5>{this.context.t('footer_quick_link')}</h5>
        <ul className="footer-link">
          <li><Link to="/courses">{this.context.t('footer_link_courses')}</Link>
          </li>
          <li><Link to="#">{this.context.t('footer_link_privacy_policy')}</Link>
          </li>
          <li><Link to="#">{this.context.t('footer_link_terms_of_use')}</Link>
          </li>
        </ul>
      </div>
    );
  }
};

ProductQuickLink.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default ProductQuickLink;
