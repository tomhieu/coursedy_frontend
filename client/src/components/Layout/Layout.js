import React, { Component } from 'react';
import I18n from 'redux-i18n';
import { translations } from 'translations';
import { TT } from 'utils/locale';
import ScrollToTop from 'utils/ScrollToTop';
import moment from 'moment';
import LoadingMask from '../../containers/LoadingMask/LoadingMask';
import Footer from '../../containers/Main/Footer/Footer';
import Header from '../../containers/Main/Header/Header';
import UserConfirmationContainer from '../../containers/Main/UserConfirmationAction/UserConfirmationContainer';
import NotificationSystemContainer from '../../containers/Main/NotificationSystem/NotificationSystemContainer';
import CoursedyHelmet from '../CoursedyHelmet';

export const momentCustom = moment;

const mainBodyStyle = {
  minHeight: '55vh'
};

class Layout extends Component {
  render() {
    const { lang } = this.props;
    const coursedyLang = localStorage.getItem('coursedyLang');
    const initialLang = coursedyLang === 'vn' ? 'vi' : coursedyLang || TT.locale
    momentCustom.locale(lang);
    return (
      <I18n translations={translations} initialLang={initialLang}>
        <ScrollToTop>
          <div className="main-content">
            <CoursedyHelmet />
            <Header />
            <main className="main-container" style={mainBodyStyle}>
              {this.props.children}
            </main>
            <Footer />
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

Layout.propTypes = {
  lang: React.PropTypes.string
};

export default Layout;
