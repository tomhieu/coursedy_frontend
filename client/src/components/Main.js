import React from 'react';
import Layout from './Layout/Layout';

const Main = props => (
  <Layout {...props}>
    { props.children }
  </Layout>
);

export default Main;
