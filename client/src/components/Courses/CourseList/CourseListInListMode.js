import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../CourseItem/CourseItem.module.scss';
import { CourseItem } from '../../index';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseListInListMode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      deleteCourse, 
      selectCourseHdl, 
      displayMode, 
      selectedCourses, 
      isPublic,
      followedCourses
    } = this.props;
    return (
        <div className={styles.courseListItemWrapper + " row "  + " " + styles.alt}>
        {
          this.props.courses.map((item, index) => (
            <div className="col-xs-12 col-sm-12 col-md-12" key={'course-' +index}>
              <CourseItem item={item} 
                deleteCourse={deleteCourse}
                selectCourseHdl={selectCourseHdl}
                displayMode={displayMode}
                selectedCourses={selectedCourses} 
                isPublic={isPublic}
                isFollowed={isPublic ? (followedCourses.indexOf(item.id) > 0) : false}
              />
            </div>
          ))
        }
        </div>
    )
  }
}

CourseListInListMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseListInListMode.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseListInListMode, styles);
