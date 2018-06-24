import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { CourseItem } from '../../index';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseListInGridMode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      displayMode,
      itemClass, isPublic, courseStatus
    } = this.props;

    return (
      <div className="row flex-auto">
      {
        this.props.courses.map((item, index) => (
          <div className={itemClass} key={'course-' +index}>
            <CourseItem item={item}
                        displayMode={displayMode}
                        isPublic={isPublic}
                        courseStatus={courseStatus}
            />
          </div>
        ))
      }
      </div>
    )
  }
}

CourseListInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseListInGridMode.defaultProps = {
  displayMode: 'grid',
  isPublic: false
}

CourseListInGridMode.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseListInGridMode, styles);
