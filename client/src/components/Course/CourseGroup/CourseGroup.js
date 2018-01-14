import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseGroup.module.scss';
import {Link} from 'react-router-dom';

class CourseGroup extends Component {
  render() {
    let { course } = this.props

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" key={ course.id }>
        <div className="panel panel-default">
          <div className="panel-body">
            <Link to={'#'} title={ course.name } >
              <img src={ course.coverImage } alt={ course.name }/>
              <span>{ course.name }</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

CourseGroup.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseGroup.propTypes = {
};

export default cssModules(CourseGroup, styles);
