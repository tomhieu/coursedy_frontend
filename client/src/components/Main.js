import React from 'react'
import Layout from './Layout/Layout'
import I18n from "redux-i18n"
import {translations} from "../translations"
import {MuiThemeProvider} from "material-ui";

const Main = (props) => (
    <MuiThemeProvider>
      <Layout {...props}>
          { props.children }
      </Layout>
    </MuiThemeProvider>
);

export default Main;
