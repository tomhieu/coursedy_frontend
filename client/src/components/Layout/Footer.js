import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Footer.module.scss';
import FooterAside from './SubFooter/FooterAside'
import FooterMain from './SubFooter/FooterMain'
import FooterEnd from './SubFooter/FooterEnd'


class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__top">
          <div className="container footer__wrap">
            <div className="flexbox flexbox--row">
              <FooterAside />
              <FooterMain />
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <FooterEnd />
          </div>
        </div>
      </footer>
    )
  }
}


export default cssModules(Footer, styles);
