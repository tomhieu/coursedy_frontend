import React from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorPage.module.scss';
import { TutorSearchForm, TutorList } from '../../components/index';

const TutorPage = props => (
  <div className="container">
    <TutorSearchForm />
    <TutorList />
  </div>
);

export default cssModules(TutorPage, styles);
