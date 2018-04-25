import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { CourseItem } from '../index';
import CourseListInListMode from './CourseList/CourseListInListMode'
import CourseListInGridMode from './CourseList/CourseListInGridMode'
import {TT} from "utils/locale";
import EmptyResultWarning from '../Core/EmptyResultWarning';
import LoadingMask from "../LoadingMask/LoadingMask";


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {courses, isFetching, fullHeight = false, isPublic} = this.props;
    return (
        <div className={(fullHeight ? styles.courseListContainerFullHeight : isPublic ? styles.courseListContainer : '')}>
          {
            isFetching ? <div></div> : courses.length === 0
              ? (
                <EmptyResultWarning styles={styles.courseListContainer} typeSearch="search_course"/>
              ) : this.props.displayMode === 'grid' ?
                <CourseListInGridMode {...this.props} /> :
                <CourseListInListMode {...this.props} />
          }
        </div>
    )
  }
}


CourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseList.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  itemClass: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired,
  courses: React.PropTypes.array,
  isFetching: React.PropTypes.bool,
};

export default cssModules(CourseList, styles);
