import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotFoundPage.module.scss';
import PageContainer from '../../utils/PageContainer';

class NotFound extends React.Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('not_found_page') }}
      >
        <div className={styles.container}>
          <h1 className={styles.header}>Page Not Found</h1>
        </div>
      </PageContainer>
    );
  }
}

NotFound.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default CSSModules(NotFound, styles);
