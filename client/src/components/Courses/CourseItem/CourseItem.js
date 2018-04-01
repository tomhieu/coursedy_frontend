import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './../Course.module.scss';
import CourseItemInGridMode from "./CourseItemInGridMode";
import CourseItemInListMode from "./CourseItemInListMode";

/**
  * @Course group item template 2
  * @Use for CoursePage
  */
class CourseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.displayMode === 'grid' ? 
        <CourseItemInGridMode {...this.props} /> :
        <CourseItemInListMode {...this.props} />
    )
  }
}

CourseItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseItem.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseItem, styles);
