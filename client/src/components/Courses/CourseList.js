import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { CourseItem } from '../index';
import CourseListInListMode from './CourseList/CourseListInListMode'
import CourseListInGridMode from './CourseList/CourseListInGridMode'


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className={styles.courseListContainer + " row"}>
        {
          this.props.displayMode === 'grid' ?
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
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseList, styles);
