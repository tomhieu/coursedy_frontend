import React, { Component } from 'react'
import './CourseDetailTutor.scss'

class CourseDetailTutor extends Component {
  render() {
    return (
      <div id="course-detail-section-2" className="course-detail-section">
        <div className="section-title text-left mb-20">
          <h3>About Teacher</h3>
        </div>
        <div className="teacher-item-list-02-wrapper">
          <div className="teacher-item-list-02 clearfix">
            <div className="row gap-20">
              <div className="col-xs-12 col-sm-3 col-md-2">
                <div className="image">
                  <img src="http://placehold.it/100x100" alt="Image" />
                </div>
                <div className="clear"></div>
                
                <ul className="user-action">
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                  <li><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Google Plus"><i className="fa fa-google-plus"></i></a></li>
                </ul>
                    
              </div>
              
              <div className="col-xs-12 col-sm-9 col-md-10">
                <div className="content">
                  <span className="font700 block text-uppercase mb-5 spacing-10 font11">Primary Teacher</span>
                  <h3><a href="#">Alexey Barnashov</a></h3>
                  <p className="labeling">Computer Teacher</p>
                  <p className="short-info">Sportsman do offending supported extremity breakfast by listening. Decisively advantages nor expression unpleasing she led met.</p>
                  <a href="#" className="btn btn-primary btn-inverse btn-sm">More about him</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear mb-10"></div>
      </div>
      )
  }
}


export default CourseDetailTutor

