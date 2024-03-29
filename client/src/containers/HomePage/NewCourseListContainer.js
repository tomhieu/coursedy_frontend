import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as HomePageActions from 'actions/HomePageActionCreator';
import { bindActionCreators } from 'redux';
import CourseItemInGridMode from 'components/Courses/CourseItem/CourseItemInGridMode';
import CoursedySlider, { Slider } from '../../components/Slider/CoursedySlider';
import CourseGroupFooter from '../../components/Course/CourseGroup/CourseGroupFooter';
import LoadingMask from '../LoadingMask/LoadingMask';


class NewCourseList extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired
  }

  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    courses: []
  }

  componentWillMount() {
    this.props.fetchNewCourses();
  }

  render() {
    if (!this.props.courses.length) {
      return null;
    }

    return (
      <section className="course__new-courses">
        <LoadingMask placeholderId="newCourseListPlaceholder">
          <div className="container course__new-courses__content-wrap">
            <div className="section-content-wrapper">
              <div className="course__new-courses__heading">
                <h2 className="heading">{this.context.t('new_courses')}</h2>
              </div>

              <div className="course__new-courses__content">
                {
                  <CoursedySlider items={this.props.courses.map((course, index) => {
                    return <CourseItemInGridMode item={course} key={index} isPublic />;
                  })}
                  />
                }
              </div>

              <CourseGroupFooter
                redirectUrl="/courses"
                btnName={this.context.t('watch_all_courses')}
              />
            </div>
          </div>
        </LoadingMask>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.HomePage.newCourses
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(HomePageActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseList);
