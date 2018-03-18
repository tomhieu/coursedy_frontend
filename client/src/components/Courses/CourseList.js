import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { CourseItem } from '../index';
import CourseListInListMode from './CourseList/CourseListInListMode'
import CourseListInGridMode from './CourseList/CourseListInGridMode'
import {TT} from "utils/locale";


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {courses, isFetching} = this.props;
    if (courses.length === 0) {
      return (
        <div className={styles.courseListContainer + " row justify-content-center"}>
          <div className="d-flex flex-auto align-items-center">
            <div className="d-flex flex-vertical flex-auto align-items-center">
              <img src="/search-not-found.svg" width={100} height={100} alt="search-not-found"/>
              <h3>{this.context.t("search_empty_result", {type: this.context.t("search_course")})}</h3>
            </div>
          </div>
        </div>
      )
    }
    return (
        <div className={styles.courseListContainer + " row"}>
          {
            isFetching ? <div></div> : courses.length === 0
              ? (
                <EmptyResultWarning />
              ) : this.props.displayMode === 'grid' ?
                <CourseListInGridMode {...this.props} /> :
                <CourseListInListMode {...this.props} />
          }
        </div>
    )
  }
}

const EmptyResultWarning = () => {
  return (
    <div className={styles.courseListContainer + " row justify-content-center"}>
      <div className="d-flex flex-auto align-items-center">
        <div className="d-flex flex-vertical flex-auto align-items-center">
          <img src="/search-not-found.svg" width={100} height={100} alt="search-not-found"/>
          <h3>{TT.t("search_empty_result", {type: TT.t("search_course")})}</h3>
        </div>
      </div>
    </div>
  )
}

CourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseList.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseList, styles);
