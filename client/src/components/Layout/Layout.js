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
    this.props.dispatch(Actions.signOutUser())
  }


  render() {
    const {footer, session} = this.props;
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <div className="main-content">
          <Header session={session} signOut={this.signOut.bind(this)}/>
          <div className='custom-container'>
            {this.props.children}
          </div>
          {
            footer.show ? <Footer/> : null
          }
        </div>
      </I18n>
    )
  }
}

export default Layout;