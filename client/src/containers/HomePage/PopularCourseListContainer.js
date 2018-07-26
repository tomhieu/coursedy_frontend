import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as HomePageActions from 'actions/HomePageActionCreator';
import CourseGroupHeading from '../../components/Course/CourseGroup/CourseGroupHeading';
import CourseGroupFooter from '../../components/Course/CourseGroup/CourseGroupFooter';
import CoursedySlider, {Slider} from '../../components/Slider/CoursedySlider';
import LoadingMask from "../../components/LoadingMask/LoadingMask";
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
            <div className="section-content-wrapper">
              <CourseGroupHeading title={this.context.t('popular_courses')}/>

              {
                <CoursedySlider items={this.props.courses.map((course, index) => {
                    return <CourseItemInGridMode item={course} key={index} isPublic={true}/>;
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
