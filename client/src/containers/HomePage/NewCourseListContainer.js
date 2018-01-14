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
    // const settings = {
    //   className: 'center',
    //   infinite: true,
    //   centerPadding: '60px',
    //   slidesToShow: 3,
    //   // swipeToSlide: true,
    //   slidesToScroll: 3,
    //   speed: 1500,
    //   afterChange: function (index) {
    //     console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
    //   }
    // };

    // return (
    //   <div>
    //     <h2>Swipe To Slide</h2>
    //     <Slider {...settings}>
    //       <div><h3>1</h3></div>
    //       <div><h3>2</h3></div>
    //       <div><h3>3</h3></div>
    //       <div><h3>4</h3></div>
    //       <div><h3>5</h3></div>
    //       <div><h3>6</h3></div>
    //       <div><h3>7</h3></div>
    //       <div><h3>8</h3></div>
    //       <div><h3>9</h3></div>
    //     </Slider>
    //   </div>
    // )

    let { courses } = this.props

    return courses.map((course, index) => {
      return <NewCourse course={ course } key={index} />
    })
  }

  render() {
    return (
      <section className="container row-margin course-section course-section__new-courses">
        <div className="row">
          <h2 className="heading">Khoá Học Mới Mở</h2>
        </div>
        <div className="row course-section__content">
          { this.renderCourses() }
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
