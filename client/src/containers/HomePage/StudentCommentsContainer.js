import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as StudentActions from 'actions/StudentActionCreator'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Slider } from '../../components/Slider/SliderComponent'

const Item = ({item}) => {
  return (
    <div className="slick-slide_item">
      <div className="">
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
            <p>{item.comment.content}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
            <img src={item.user.avatar}/>
            <strong>{item.user.full_name}</strong>
            <span>{item.user.job}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

class StudentComments extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  static propTypes = {
    appraises: PropTypes.array.isRequired
  }

  static defaultProps = {
    appraises: []
  }

  componentDidMount() {
    this.props.fetchStudentsComment()
  }

  render() {
    return (
      <section className="course__student-comment">
        <div className="container course__student-comment__content-wrap">
          <div className="row-margin">
            <h2 className="heading" dangerouslySetInnerHTML={{__html: this.context.t('student_top_comments')}} />
            <div>
              {<Slider settings={{slidesToShow: 3, slidesToScroll: 3}}
                       items={this.props.appraises.map((item, index) => {return <Item item={item} key={index}/>})}
              />}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appraises: state.HomePage.studentsComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StudentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentComments)
