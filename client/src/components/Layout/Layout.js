import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import I18n from "redux-i18n"
import {translations} from "../../translations"
import {TT} from '../../utils/locale'
import styles from './Layout.module.scss'
import * as Actions from '../../actions/SessionActionCreator'
import LoadingMask from "../LoadingMask/LoadingMask";

class Layout extends Component {
  componentDidMount(){
    this.props.dispatch(Actions.setCurrentUser());
  }

  signOut(e) {
    e.preventDefault();
    this.props.dispatch(Actions.signOutUser())
  }


  render() {
    const {main, session} = this.props;
    return (
      <I18n translations={translations} initialLang={TT.locale}>
        <div className="main-content">
          <Header session={session} signOut={this.signOut.bind(this)}/>
          <main className={!main.stetchAuto ? styles.stretchFull : 'container'}>
            {this.props.children}
          </main>
          {
            main.showFooter ? <Footer/> : null
          }
          <div className="general-placeholder">
            <LoadingMask placeholderId="ezylearningFullLoader" isFullLoading={true}></LoadingMask>
          </div>
        </div>
      </I18n>
    )
  }
}

Layout.propTypes = {
  main: React.PropTypes.object,
  session: React.PropTypes.object
};

export default Layout;