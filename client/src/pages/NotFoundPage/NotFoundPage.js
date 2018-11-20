import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotFoundPage.module.scss';
import PageContainer from '../../utils/PageContainer';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../components/Core/PrimaryButton/PrimaryButton';

class NotFound extends React.Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('not_found_page') }}
      >
        <div className={styles.container}>
          <div className={styles.page404Wrap}>
            <h1 className={styles.page404Header}>
              { this.context.t('page_404_title') }
            </h1>
            <p className={styles.page404Description}>
              { this.context.t('page_404_description')}
            </p>
            <Link to="/" className={styles.backToHomePage}>
              <PrimaryButton
                type="submit"
                title={this.context.t('back_to_homepage')}
                round
                line={false}
              />
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }
}

NotFound.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default CSSModules(NotFound, styles);
