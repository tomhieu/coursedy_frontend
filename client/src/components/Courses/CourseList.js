import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { CourseItem } from '../index';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {deleteCourse, selectCourseHdl, displayMode, selectedCourses} = this.props;
    var rows = [];
    if (displayMode == 'grid') {
      for (var i = 0; i < this.props.courses.length; i++) {
        if (i % 4 == 0) {
          rows.push(
            <div className="clearfix" key={'course-separator-'+i}></div>
          )
        }
        rows.push(
          <div className="col-xs-12 col-sm-6 col-md-3" key={'course-' +i}>
            <CourseItem item={this.props.courses[i]} 
              deleteCourse={deleteCourse}
              selectCourseHdl={selectCourseHdl.bind(this)}
              displayMode={displayMode}
              selectedCourses={selectedCourses}
            />
          </div>
        )
      }
    } else if (displayMode == 'list') {
      for (var i = 0; i < this.props.courses.length; i++) {
        rows.push(
          <div className="col-xs-12 col-sm-12 col-md-12" key={'course-' +i}>
            <CourseItem item={this.props.courses[i]} 
              deleteCourse={deleteCourse}
              selectCourseHdl={selectCourseHdl.bind(this)}
              displayMode={displayMode}
              selectedCourses={selectedCourses}
            />
          </div>
        )
      }
    }
    return (
        <div className={styles.courseListContainer + " row"}>
        { rows }
        </div>
    )
  }
}

CourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseList.propTypes = {
};

export default cssModules(CourseList, styles);
