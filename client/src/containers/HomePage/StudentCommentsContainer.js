import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as StudentActions from 'actions/StudentActionCreator'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class StudentComments extends Component {
  componentDidMount() {
    this.props.fetchStudentsComment()
  }

  static propTypes = {
    appraises: PropTypes.array.isRequired
  }

  static defaultProps = {
    appraises: []
  }

  renderItems() {
    let { appraises } = this.props
    return appraises.map((item, index) => {
      return (
        <div className="item active" key={index}>
          <div className="col-lg-4 col-xs-4 col-md-4 col-sm-4">
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
    })
  }

  render() {
    return (
      <section className="container row-margin">
        <div className="row">
          <h2 className="heading">Nhận Xét Học Sinh</h2>
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
    appraises: state.HomePage.studentsComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(StudentActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentComments)
