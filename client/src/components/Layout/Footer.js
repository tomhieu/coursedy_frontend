import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Footer.module.scss';
import SocialMedia from './SubFooter/SocialMedia';
import CopyRight from './SubFooter/CopyRight';
import ProductDescription from './SubFooter/ProductDescription';
import ProductQuickLink from './SubFooter/ProductQuickLink';
import ProductContact from './SubFooter/ProductContact';


class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="style2">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <ProductDescription classNames="col-sm-12 col-md-6"/>
              <ProductQuickLink classNames="col-sm-6 col-md-3"/>
              <ProductContact classNames="col-sm-6 col-md-3"/>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <CopyRight classNames="col-sm-8"/>
              <SocialMedia classNames="col-sm-4"/>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}


export default cssModules(Footer, styles);
