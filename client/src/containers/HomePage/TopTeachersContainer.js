import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TeacherActions from 'actions/HomePageActionCreator';
import { bindActionCreators } from 'redux';
import { Slider } from '../../components/Slider/CoursedySlider';
import LoadingMask from '../LoadingMask/LoadingMask';
import CoursedySlider from '../../components/Slider/CoursedySlider';
import Image from '../../components/Core/ImageComponent';


const Item = ({ item }) => {
  return (
    <div className="slick-slide_item">
      <div className="row">
        <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12 user">
          <div className="user__avatar-left">
            <Image
              src={item.avatar}
            />
          </div>
          <div className="user__info-right">
            <div className="user__fullname">{item.full_name}</div>
            <div className="user__job">{item.job}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


class TopTeachers extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired
  };

  static propTypes = {
    topTeachers: PropTypes.array.isRequired,
    totalCourses: PropTypes.number.isRequired,
    totalTeachers: PropTypes.number.isRequired
  };

  static defaultProps = {
    topTeachers: [], totalCourses: 0, totalTeachers: 0
  };

  componentDidMount() {
    this.props.fetchTopTeachers();
  }

  render() {
    if (!this.props.topTeachers.length) {
      return null;
    }

    return (
      <section className="course__top-teacher">
        <LoadingMask placeholderId="topTeacherPlaceholder">
          <div className="course__top-teacher__content-wrap">
            <div className="section-content-wrapper">
              <div className="course__top-teacher__heading">
                <div className="container">
                  <h2>
                    {this.context.t('top_teacher_pre')}
                    {' '}
                    {this.props.totalTeachers}
                    {' '}
                    {this.context.t('top_teacher_post')}
                    {' '}
                    {this.context.t('course_num_pre')}
                    {' '}
                    {this.props.totalCourses}
                    {' '}
                    {this.context.t('course_num_post')}
                  </h2>
                </div>
              </div>
              <div className="course__top-teacher__body">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <h3
                        className="course__top-teacher__body__heading"
                        dangerouslySetInnerHTML={{ __html: this.context.t('top_teacher_month') }}
                      />
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      {<CoursedySlider
                        settings={{ slidesToShow: 3, slidesToScroll: 3 }}
                        items={this.props.topTeachers.map((item, index) => {
                          return <Item item={item} key={index} />;
                        })}
                      />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingMask>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    topTeachers: state.HomePage.topTeachers,
    totalCourses: state.HomePage.totalCourses,
    totalTeachers: state.HomePage.totalTeachers
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TeacherActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTeachers);
