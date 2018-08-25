import React, { Component } from 'react';
import I18n from 'redux-i18n';
import { translations } from 'translations';
import { TT } from 'utils/locale';
import ScrollToTop from 'utils/ScrollToTop';
import LoadingMask from '../LoadingMask/LoadingMask';
import Footer from '../../containers/Main/Footer/Footer';
import Header from '../../containers/Main/Header/Header';
import UserConfirmationContainer from '../../containers/Main/UserConfirmationAction/UserConfirmationContainer';
import NotificationSystemContainer from '../../containers/Main/NotificationSystem/NotificationSystemContainer';

const mainBodyStyle = {
  minHeight: '55vh'
};

class Layout extends Component {
  render() {
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <ScrollToTop>
          <div className="main-content">
            <Header />
            <main className="container" style={mainBodyStyle}>
              {this.props.children}
            </main>
            <Footer />
            <div className="general-placeholder">
              <LoadingMask placeholderId="ezylearningFullLoader" isFullLoading />
            </div>
            <UserConfirmationContainer />
            <div className="notification-system-container">
              <NotificationSystemContainer />
            </div>
          </div>
        </ScrollToTop>
      </I18n>
    );
  }
}

export default Layout;
