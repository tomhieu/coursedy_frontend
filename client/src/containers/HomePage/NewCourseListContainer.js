import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewCourse from './NewCourseContainer'
import { connect } from 'react-redux'
import * as HomePageActions from 'actions/HomePageActionCreator'
import { bindActionCreators } from 'redux'
import { Slider } from '../../components/Slider/SliderComponent'


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

  componentDidMount() {
    this.props.fetchNewCourses()
  }

  render() {
    return (
      <section className="course__new-courses">
        <div className="container course__new-courses__content-wrap">
          <div className="row-margin">
            <div className="course__new-courses__heading">
              <h2 className="heading">{this.context.t('new_courses')}</h2>
            </div>
            <div className="course__new-courses__content">
              {<Slider items={this.props.courses.map((course, index) => {
                return <NewCourse course={course} key={index}/>
              })}/>}
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
  return bindActionCreators(HomePageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseList)
