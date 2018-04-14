import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseGroupList.module.scss';
import { CourseGroup } from '../../index'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomePageActions from 'actions/HomePageActionCreator'


/**
  * @Course group template 1
  * @Use for HomePage
  */
class CourseGroupList extends Component {
  componentDidMount() {
    this.props.fetchPopularCourses()
  }

  render() {
    return (
      <section className="our-popular">
        <div className="container">
          <div className="row-padding">
            <div className="row ">
              <div className="col-sm-12 ">
                <h2 className="heading">{this.context.t('popular_courses')}</h2>
              </div>
            </div>
            {
              this.props.courses.map((course, index) => {
                return (
                  <CourseGroup course={course} key={index}/>
                )
              })
            }
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="mtop4">
                  <a href="#" className="btn-link">{this.context.t('all_courses')}</a>
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

const mapStateToProps = (state) => {
  return {
    courses: state.HomePage.popularCourses
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(HomePageActions, dispatch)
};


export default cssModules(connect(
  mapStateToProps, mapDispatchToProps
)(CourseGroupList), styles);
