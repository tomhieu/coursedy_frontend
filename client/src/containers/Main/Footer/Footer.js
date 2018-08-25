import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Footer.module.scss';
import './Footer.scss';
import { connect } from 'react-redux';
import FooterAside from '../../../components/Layout/SubFooter/FooterAside';
import FooterMain from '../../../components/Layout/SubFooter/FooterMain';
import FooterEnd from '../../../components/Layout/SubFooter/FooterEnd';


class Footer extends Component {
  render() {
    const { showFooter } = this.props;
    if (!showFooter) {
      return null;
    }

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
    );
  }
}

const mapStateToProps = (state) => {
  return { showFooter: state.main.showFooter };
};

export default connect(
  mapStateToProps
)(cssModules(Footer, styles));
