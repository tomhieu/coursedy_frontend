import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import I18n from "redux-i18n"
import {translations} from "../../translations"
import {LoginRegisterPage} from "../../containers/index";
import {TT} from '../../utils/locale'
import * as Actions from '../../actions/SessionActionCreator'

class Layout extends Component {
  componentDidMount(){
    this.props.dispatch(Actions.setCurrentUser());
  }

  signOut(e) {
    e.preventDefault();
    console.log(this.props)
    this.props.dispatch(Actions.signOutUser())
  }


  render() {
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <div className="">
          <Header session={this.props.session} signOut={this.signOut.bind(this)}/>
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