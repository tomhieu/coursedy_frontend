import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as TeacherActions from 'actions/TeacherCreators'
import {bindActionCreators} from 'redux';


class TopTeachers extends Component {
  static propTypes = {
    teachers: PropTypes.array.isRequired,
    totalCourses: PropTypes.number.isRequired,
    totalTeachers: PropTypes.number.isRequired,
  }

  static defaultProps = {
    teachers: [],
    totalCourses: 0,
    totalTeachers: 0
  }

  componentDidMount() {
    this.props.fetchTopTeachers()
  }

  renderItems() {
    let { teachers } = this.props
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
      )
    })
  }

  render() {
    return (
      <section className="container teacher-top">
        <div className="row">
          <h2 className="heading">Với Hơn { this.props.totalTeachers } Giáo Viên Giỏi Và { this.props.totalCourses } Khoá Học Đang Được Dạy</h2>
        </div>
        <div className="row">
          <h3>TOP GIÁO VIÊN NỔI TIẾNG TRONG THÁNG</h3>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="carousel slide" id="myCarousel">
              <div className="carousel-inner">
                { this.renderItems() }
              </div>
              <a className="left carousel-control" href="#myCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.HomePage.topTeachers,
    totalCourses: state.HomePage.totalCourses,
    totalTeachers: state.HomePage.totalTeachers
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TeacherActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTeachers)
