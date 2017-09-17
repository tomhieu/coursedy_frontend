import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseGroupList.module.scss';
import {CourseGroup} from '../index'

class CourseGroupList extends Component {
  render() {
    return (
      <section className="our-popular">
        <div className="container">
          <div className="row-margin">
            <div className="row ">
              <div className="col-sm-12 ">
                <h2 className="heading">Our Popular Courses</h2>
              </div>
            </div>
            {
              [1,2,3,4,5,6,7,8].map(function (x) {
                return (
                  <div className="col-md-3 col-sm-6 col-xs-12" key={x}>
                    <CourseGroup/>
                  </div>
                )
              })
            }
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="mtop4">
                  <a href="http://dev.mindsworthy.com/tutorsci/demo/courses" className="btn-link">Check All Courses</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

CourseGroupList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseGroupList.propTypes = {
};

export default cssModules(CourseGroupList, styles);
