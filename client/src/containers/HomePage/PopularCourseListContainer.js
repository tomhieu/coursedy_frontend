import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as HomePageActions from 'actions/HomePageActionCreator';
import CourseGroup from 'components/Course/CourseGroup/CourseGroup';
import CourseGroupHeading from '../../components/Course/CourseGroup/CourseGroupHeading';
import CourseGroupFooter from '../../components/Course/CourseGroup/CourseGroupFooter';
import { Slider } from '../../components/Slider/SliderComponent';


class PopularCourseList extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired
  };

  static propTypes = {
    courses: PropTypes.array.isRequired
  };

  static defaultProps = {
    courses: []
  };

  componentDidMount() {
    this.props.fetchPopularCourses();
  }

  render() {
    if (!this.props.courses.length) {
      return null;
    }

    return (
      <section className="course__popular">
        <div className="container course__popular__content-wrap">
          <div className="row-margin">
            <CourseGroupHeading title={this.context.t('popular_courses')}/>

            {<Slider items={this.props.courses.map((course, index) => {
              return <CourseGroup course={course} key={index}/>;
            })}/>}

            <CourseGroupFooter
              redirectUrl="/courses"
              btnName={this.context.t('watch_all_courses')}/>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    courses: state.HomePage.popularCourses
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(HomePageActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularCourseList);
