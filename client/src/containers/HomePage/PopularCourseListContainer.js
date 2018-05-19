import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as HomePageActions from 'actions/HomePageActionCreator';
import CourseGroup from 'components/Course/CourseGroup/CourseGroup';
import CourseGroupHeading from '../../components/Course/CourseGroup/CourseGroupHeading';
import CourseGroupFooter from '../../components/Course/CourseGroup/CourseGroupFooter';
import { Slider } from '../../components/Slider/SliderComponent';
import LoadingMask from "../../components/LoadingMask/LoadingMask";
import CourseListInGridMode from "../../components/Courses/CourseList/CourseListInGridMode";
import CoursedySlider from "../../components/Slider/SliderComponent";
import CourseItemInGridMode from "../../components/Courses/CourseItem/CourseItemInGridMode";


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
        <LoadingMask placeholderId="popularCourseListPlaceholder">
          <div className="container course__popular__content-wrap">
            <div className="row-padding">
              <CourseGroupHeading title={this.context.t('popular_courses')}/>

              {
                <CoursedySlider items={this.props.courses.map((course, index) => {
                    return <CourseItemInGridMode item={course} key={index}/>;
                  })}/>
              }


              <CourseGroupFooter
                redirectUrl="/courses"
                btnName={this.context.t('watch_all_courses')}/>
            </div>
          </div>
        </LoadingMask>
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
