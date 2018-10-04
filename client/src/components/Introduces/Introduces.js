import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Introduces.module.scss';
import SearchCourseIcon from '../Core/Icons/SearchCourseIcon';
import InteractionLearningIcon from '../Core/Icons/InteractionLearningIcon';
import CourseStudyingIcon from '../Core/Icons/CourseStudyingIcon';


class Introduces extends Component {
  render() {
    return (
      <section className={styles.introduceSection}>
        <div className="container">
          <div className={`${styles.headerSearchContainer} row`}>
            <div className="col-md-4 col-sm-12">
              <div className="d-flex flex-row">
                <div className={styles.headerSearchIcon}>
                  <SearchCourseIcon />
                </div>
                <div className="d-flex flex-column">
                  <div className={styles.headerSearchIntroduce}>{this.context.t('homepage_search_introduce_explore')}</div>
                  <div className={styles.contentSearchIntroduce}>{this.context.t('homepage_search_introduce_explore_content')}</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="d-flex flex-row">
                <div className={styles.headerSearchIcon}>
                  <InteractionLearningIcon />
                </div>
                <div className="d-flex flex-column">
                  <div className={styles.headerSearchIntroduce}>{this.context.t('homepage_search_introduce_enroll')}</div>
                  <div className={styles.contentSearchIntroduce}>{this.context.t('homepage_search_introduce_enroll_content')}</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="d-flex flex-row">
                <div className={styles.headerSearchIcon}>
                  <CourseStudyingIcon />
                </div>
                <div className="d-flex flex-column">
                  <div className={styles.headerSearchIntroduce}>{this.context.t('homepage_search_introduce_distance')}</div>
                  <div className={styles.contentSearchIntroduce}>{this.context.t('homepage_search_introduce_distance_content')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


Introduces.contextTypes = {
  t: React.PropTypes.func.isRequired
};

Introduces.propTypes = {};

export default cssModules(Introduces, styles);
