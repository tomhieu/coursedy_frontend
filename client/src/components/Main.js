import React from 'react'
import Layout from './Layout/Layout'
import I18n from "redux-i18n"
import {translations} from "../translations"

const Main = (props) => (
  <Layout {...props}>
    { props.children }
  </Layout>
);

export default Main;
