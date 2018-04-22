import React, { Component } from 'react'
import './CourseDetailIntro.scss'

class CourseDetailIntro extends Component {
  render() {
    return (
      <div id="course-detail-intro" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>Course Introduction</h3>
        </div>
        <div className="mb-20">
          <img src="http://placehold.it/1366x768" alt="" className="img-fluid"/>
        </div>
        <div className="course-intro">
          <div className="listing-box clearfix">
            <h5>Course Highlight</h5>
            <ul className="listing-box-list">
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-6"><i className="fa fa-bars mr-5"></i> Level</div>
                  <div className="col-xs-7 col-sm-6 text-right font600">Begining</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-6"><i className="fa fa-clock-o mr-5"></i> Duration</div>
                  <div className="col-xs-7 col-sm-6 text-right font600">5.4 houres</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-calendar mr-5"></i> Start</div>
                  <div className="col-xs-7 col-sm-7 text-right font600">November 14, 2016</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-pencil-square-o mr-5"></i> Lesson</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> 24 lessons</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-file-video-o mr-5"></i> Type</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> Video online</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-users mr-5"></i> No. Student</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> 15 availabilities</div>
                </div>
              </li>
              <li>
                <div className="row gap-10">
                  <div className="col-xs-5 col-sm-5"><i className="fa fa-graduation-cap"></i> Includes</div>
                  <div className="col-xs-7 col-sm-7 text-right font600"> CCPA+ certificate</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <h5 className="text-uppercase font700">About the course</h5>
        <p>Delightful remarkably mr on announcing themselves entreaties favourable. About to in so terms voice at. Equal an would is found seems of. The particular friendship one sufficient terminated frequently themselves. It more shed went up is roof if loud case. Delay music in lived noise an. Beyond genius really enough passed is up.</p>
        <h6 className="spacing-10 font600">What you will learn</h6>
        <ul className="list-with-icon">
          <li><span><i className="fa fa-check text-danger"></i> Way ham unwilling not breakfast furniture</span></li>
          <li><span><i className="fa fa-check text-danger"></i> Their end whole might began her </span></li>
          <li><span><i className="fa fa-check text-danger"></i> Behaved the comfort another fifteen eat</span></li>
          <li><span><i className="fa fa-check text-danger"></i> About to in so terms voice </span></li>
          <li><span><i className="fa fa-check text-danger"></i> Old education him departure any arranging one prevailed</span></li>
        </ul>
        <p>Old education him departure any arranging one prevailed. Their end whole might began her. Behaved the comfort another fifteen eat. Partiality had his themselves ask pianoforte increasing discovered. So mr delay at since place whole above miles. He to observe conduct at detract because. Way ham unwilling not breakfast furniture explained perpetual. Or mr surrounded conviction so astonished literature. Songs to an blush woman be sorry young. We certain as removal attempt.</p>
        <h6 className="spacing-10 font600">More Course Information</h6>
        <p>Ladyship it daughter securing procured or am moreover mr. Put sir she exercise vicinity cheerful wondered. Continual say suspicion provision you neglected sir curiosity unwilling. Simplicity end themselves increasing led day sympathize yet. General windows effects not are drawing man garrets. Common indeed garden you his ladies out yet. Preference imprudence contrasted to remarkably in on. Taken now you him trees tears any. Her object giving end sister except oppose.</p>
      </div>
    )
  }
}

export default CourseDetailIntro