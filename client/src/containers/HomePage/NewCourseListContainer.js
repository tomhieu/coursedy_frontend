import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewCourse from './NewCourseContainer';
import Slider from 'react-slick'
import {connect} from 'react-redux';
import * as CoursesActions from 'actions/CoursesActionCreator'
import {bindActionCreators} from 'redux';

class NewCourseList extends Component {
  static propTypes = {
    courses: PropTypes.array.isRequired
  }

  static defaultProps = {
    courses: []
  }

  componentDidMount() {
    this.props.fetchNewCourses()
  }

  renderCourses() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };

    return (
      <div>
        <h2> Responsive </h2>
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
          <div><h3>7</h3></div>
          <div><h3>8</h3></div>
        </Slider>
      </div>
    )

    let { courses } = this.props

    return courses.map((course, index) => {
      return <NewCourse course={ course } key={index} />
    })
  }

  render() {
    return (
      <section className="course__new-courses">
        <div className="container course__new-courses__content-wrap">
          <div className="row-margin">
            <div className="course__new-courses__heading">
              <h2 className="heading">Khoá Học Mới Mở</h2>
            </div>
            <div className="row course__new-courses__content">
              { this.renderCourses() }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.HomePage.newCourses
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CoursesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseList)
