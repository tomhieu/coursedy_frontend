import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

class ProductDescription extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={this.props.classNames}>
        <div className="footer-logo"><Link to="/"><img src="#" alt=""/></Link></div>
        <div className="footer-text">
          <p>{this.context.t('product_description')}</p>
          <div className="read-more">
            <NavLink to="/">{this.context.t('product_read_more')}</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

ProductDescription.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default ProductDescription
