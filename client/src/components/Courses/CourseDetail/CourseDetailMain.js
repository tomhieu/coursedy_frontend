import React, { Component } from 'react'
import CourseDetailLeftSide from './CourseDetailLeftSide'
import CourseDetailRightSide from './CourseDetailRightSide'
import './CourseDetailMain.scss'


class CourseDetailMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayFixedSidebar: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(event) {
    const triggerPosition = 100
    const top  = window.pageYOffset || document.documentElement.scrollTop
    // console.log('On scroll')
    // console.log(top)
    if (triggerPosition < top) {
      this.setState({
        displayFixedSidebar: true
      })
    } else {
      this.setState({
        displayFixedSidebar: false
      })
    }
  }

  render() {
    const { displayFixedSidebar } = this.state
    return (
      <div className="course-detail-main">
        <div className="container">
          <CourseDetailLeftSide 
            {...this.props}
            displayFixedSidebar={displayFixedSidebar}
          />
          <CourseDetailRightSide 
            {...this.props}
            displayFixedSidebar={displayFixedSidebar}
          />
        </div>
      </div>
    )
  }
}

CourseDetailMain.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailMain.propTypes = {
};

export default CourseDetailMain