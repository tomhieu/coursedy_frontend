import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotFoundPage.module.scss';

const NotFound = () => (
  <PageContainer>
    <div className={styles.container}>
      <h1 className={styles.header}>Page Not Found</h1>
    </div>
  </PageContainer>
);

export default CSSModules(NotFound, styles);
