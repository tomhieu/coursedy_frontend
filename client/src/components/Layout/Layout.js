import React, {Component} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import I18n from "redux-i18n"
import {translations} from "translations"
import {TT} from 'utils/locale'
import LoadingMask from "../LoadingMask/LoadingMask";
import ScrollToTop from 'utils/ScrollToTop'

class Layout extends Component {
  render() {
    const {main, session} = this.props;
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <ScrollToTop>
          <div className="main-content">
            <Header session={session} {...this.props} />
            <main className='container'>
              {this.props.children}
            </main>
            {
              main.showFooter ? <Footer/> : null
            }
            <div className="general-placeholder">
              <LoadingMask placeholderId="ezylearningFullLoader" isFullLoading={true}></LoadingMask>
            </div>
          </div>
        </ScrollToTop>
      </I18n>
    )
  }
}

Layout.propTypes = {
  main: React.PropTypes.object,
  session: React.PropTypes.object
};

export default Layout;
