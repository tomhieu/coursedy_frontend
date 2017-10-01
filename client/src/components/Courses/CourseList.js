import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import { CourseItem } from '../index'

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
      <div className="course-group-list-2">
      {
        this.props.list.map(function (item, index) {
          return (
            <div className="col-xs-12 col-sm-12 col-md-6" key={index}>
              <CourseItem item={item}/>
            </div>
          )
        })
      }
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
