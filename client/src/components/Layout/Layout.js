import React, {Component} from 'react';
import Header from '../../containers/Main/Header/Header'
import Footer from '../../containers/Main/Footer/Footer'
import I18n from "redux-i18n"
import {translations} from "translations"
import {TT} from 'utils/locale'
import LoadingMask from "../LoadingMask/LoadingMask";
import ScrollToTop from 'utils/ScrollToTop'
import UserConfirmationContainer from "../../containers/Main/UserConfirmationAction/UserConfirmationContainer";
import NotificationSystemContainer from "../../containers/Main/NotificationSystem/NotificationSystemContainer";

class Layout extends Component {

  render() {
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <ScrollToTop>
          <div className="main-content">
            <Header />
            <main className='container'>
              {this.props.children}
            </main>
            <Footer/>
            <div className="general-placeholder">
              <LoadingMask placeholderId="ezylearningFullLoader" isFullLoading={true}></LoadingMask>
            </div>
            <UserConfirmationContainer />
            <div className="notification-system-container">
              <NotificationSystemContainer />
            </div>
          </div>
        </ScrollToTop>
      </I18n>
    )
  }
}

export default Layout;
