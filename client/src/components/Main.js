import React from 'react'
import Layout from './Layout/Layout'
import I18n from "redux-i18n"
import {translations} from "../translations"

const Main = (props) => (
  <I18n translations={translations} initialLang="vn">
    <div>
    <Layout>
      { props.children }
    </Layout>
    </div>
  </I18n>
);

export default Main;
