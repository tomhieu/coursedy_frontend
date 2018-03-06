import React, { Component } from 'react';
import data from '../../../configs/data.json';

class ProductContact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <h5>{this.context.t('footer_contact_us')}</h5>
        <div className="contact-view">
          <div className="contact-slide">
            <p><i className="fa fa-location-arrow"></i> {data.address}</p>
          </div>
          <div className="contact-slide">
            <p><i className="fa fa-phone"></i>  {data.phone_number}</p>
          </div>
          <div className="contact-slide">
            <p><i className="fa fa-envelope"></i>  <a href="mailTo:e"> {data.email_contact}</a></p>
          </div>
        </div>
      </div>
    )
  }
}

ProductContact.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default ProductContact
