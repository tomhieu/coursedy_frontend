import React, {PropTypes, Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import I18n from "redux-i18n"
import {translations} from "../../translations"

class Layout extends Component {
  render() {
    return (
      <I18n translations={translations} initialLang="vn">
      <div className="">
        <Header/>
        <div className="" style={{height: "900px"}}>
          { this.props.children }
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