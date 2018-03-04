import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { LinkContainer } from 'react-router-bootstrap'
import {SERVER_NAME} from "utils/CommonConstant";
import {Checkbox} from 'material-ui'
import CourseItemInListMode from './CourseItem/CourseItemInListMode'
import CourseItemInGridMode from './CourseItem/CourseItemInGridMode'

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
