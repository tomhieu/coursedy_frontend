import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import CourseListInListMode from './CourseList/CourseListInListMode';
import CourseListInGridMode from './CourseList/CourseListInGridMode';
import EmptyResultWarning from '../Core/EmptyResultWarning';


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { courses, isFetching } = this.props;
    if (!isFetching && courses.length === 0) {
      return (
        <div className="d-flex flex-auto justify-content-center" id="public-course-content">
          <EmptyResultWarning styles={styles.courseListContainer} searchType="course_type" {...this.props} />
        </div>
      );
    }

    return (
      <div className="d-flex flex-auto" id="public-course-content">
        {
          isFetching ? <div /> : this.props.displayMode === 'grid'
            ? <CourseListInGridMode {...this.props} />
            : <CourseListInListMode {...this.props} />
        }
      </div>
    );
  }
}


CourseList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseList.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  itemClass: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired,
  courses: React.PropTypes.array,
  isFetching: React.PropTypes.bool,
};

export default cssModules(CourseList, styles);
