import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import I18n from "redux-i18n"
import {translations} from "../../translations"
import {LoginRegisterPage} from "../../containers/index";
import {TT} from '../../utils/locale'

class Layout extends Component {
  render() {
    return (
      <I18n translations={translations} initialLang={TT.locale}>
      <div className="">
        <Header/>
        <div>
          {this.props.children}
        </div>
        <Footer/>
      </div>
      </I18n>
    )
  }
}

Layout.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default Layout;