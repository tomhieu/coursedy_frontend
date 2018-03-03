import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TeacherActions from 'actions/HomePageActionCreator';
import { bindActionCreators } from 'redux';
import { Slider } from '../../components/Slider/SliderComponent';


const Item = ({ item }) => {
  return (
    <div className="slick-slide_item">
      <div className="row">
        <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
          <img src={item.avatar}/>
          <strong>{item.full_name}</strong>
          <span>{item.job}</span>
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
    teachers: PropTypes.array.isRequired,
    totalCourses: PropTypes.number.isRequired,
    totalTeachers: PropTypes.number.isRequired
  };

  static defaultProps = {
    teachers: [], totalCourses: 0, totalTeachers: 0
  };

  componentDidMount() {
    this.props.fetchTopTeachers();
  }

  renderItems() {
    let { teachers } = this.props;
    return teachers.map((item, index) => {
      return (
        <div className="item active" key={index}>
          <div className="col-lg-4 col-xs-4 col-md-4 col-sm-4">
            <div className="row">
              <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
                <img src={item.avatar}/>
                <strong>{item.full_name}</strong>
                <span>{item.job}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="course__top-teacher">
        <div className="container course__top-teacher__content-wrap">
          <div className="row-margin">
            <h2 className="course__top-teacher__heading">Với
              Hơn {this.props.totalTeachers} Giáo Viên Giỏi
              Và {this.props.totalCourses} Khoá Học Đang Được Dạy</h2>
            <div className="row course__top-teacher__body">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h3 className="course__top-teacher__body__heading"
                    dangerouslySetInnerHTML={{ __html: this.context.t('top_teacher_month') }}/>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                {<Slider settings={{ slidesToShow: 3, slidesToScroll: 3 }}
                         items={this.props.teachers.map((item, index) => {
                           return <Item item={item} key={index}/>;
                         })}
                />}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    teachers: state.HomePage.topTeachers,
    totalCourses: state.HomePage.totalCourses,
    totalTeachers: state.HomePage.totalTeachers
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TeacherActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTeachers);
