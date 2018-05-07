import React, {Component} from 'react'
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
    const triggerPosition = 150
    const top = window.pageYOffset || document.documentElement.scrollTop
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
    const {displayFixedSidebar} = this.state
    return (
      <div className="row">
        {
          displayFixedSidebar ? (<div className='d-none d-md-block sidebar-fixed container'>
              <div className="full-width">
                <div style={{width: '25%', paddingRight: '23px'}}>
                  <CourseDetailLeftSide {...this.props}/>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-3 d-none d-md-block">
              <CourseDetailLeftSide {...this.props}/>
            </div>
          )
        }
        <div
          className={
            displayFixedSidebar ?
              "col-xs-12 col-sm-12 col-md-9 offset-md-3 right-content mt-25" :
              "col-xs-12 col-sm-12 col-md-9 mt-25"
          }>
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

CourseDetailMain.propTypes = {};

export default CourseDetailMain