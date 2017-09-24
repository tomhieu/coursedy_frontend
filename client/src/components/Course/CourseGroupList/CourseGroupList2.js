import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseGroupList.module.scss';
import {CourseGroup2} from '../../index'

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseGroupList2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="course-group-list-2">
      {
        this.props.list.map(function (item, index) {
          return (
            <div className="col-xs-12 col-sm-12 col-md-6" key={index}>
              <CourseGroup2 item={item}/>
            </div>
          )
        })
      }
      </div>
    )
  }
}

CourseGroupList2.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseGroupList2.propTypes = {
};

export default cssModules(CourseGroupList2, styles);
