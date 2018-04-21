import {Component} from "react";
import * as WebContants from "../../constants/WebConstants";
import * as React from "react";

class AsyncLoader extends Component {
  render() {
    const {isFullLoading, normalPlaceholder, facebookPlaceholder, sectionPlaceholder, loaderType, repeatTime = 1} = this.props;
    if (normalPlaceholder) {
      return (
        <div className={isFullLoading ? "full-loading" : "partial-loading"}>
          <div id="spinner">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      )
    } else if (sectionPlaceholder) {
      return (
        <div className="section-placeholder">
          <div id="spinner">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      )
    } else if (facebookPlaceholder) {
      switch (loaderType) {
        case WebContants.COURSE_DETAILS_PLACEHOLDER:
          return <CourseDetailsPlaceholder></CourseDetailsPlaceholder>;
        case WebContants.LESSON_DETAILS_PLACEHOLDER:
          return <LessonDetailsPlaceholder></LessonDetailsPlaceholder>;
        case WebContants.COURSE_ITEM_PLACEHOLDER:
          return <CourseItemsPlaceholder repeatTime={repeatTime}></CourseItemsPlaceholder>;
        case WebContants.USER_DETAILS_PLACEHOLDER:
          return <UserDetailsPlaceholder></UserDetailsPlaceholder>;
      }
    } else {
      return null;
    }
  }
}

const CourseDetailsPlaceholder = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="row">
          <div className="col-sm-12 col-md-12">
           <div className="container">
             <div className="row">
               <div className="col-md-12 col-sm-12">
                 <div className="background-masker image-placeholder course-cover-image-placeholder"></div>
               </div>
             </div>
             <div className="row align-items-center">
               <div className="col-md-8 col-sm-8">
                 <div className="background-masker lg-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-6 col-sm-6">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-6 col-sm-6">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-4 col-sm-4">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-3 col-sm-3">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-4 col-sm-4">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
               <div className="col-md-4 col-sm-4">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
               <div className="col-md-4 col-sm-4">
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
             <div className="row">
               <div className="col-md-12 col-sm-12">
                 <div className="background-masker sm-text-placeholder"></div>
                 <div className="background-masker sm-text-placeholder"></div>
               </div>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const LessonDetailsPlaceholder = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder"></div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder"></div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="background-masker sm-text-placeholder"></div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="background-masker lg-text-placeholder"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-3">
            <div className="background-masker image-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CourseItemPlaceholder = () => {
  return (
    <div className="animated-background">
      <div className="row">
        <div className="col-xss-12 col-xs-3 col-lg-3 col-sm-4 col-md-4">
          <div className="background-masker image-placeholder"></div>
        </div>
        <div className="col-xss-12 col-xs-12 col-lg-9 col-sm-8 col-md-8">
          <div className="content">
            <div className="background-masker lg-text-placeholder"></div>
            <div className="content-inner">
              <div className="row align-items-center">
                <div className="col-xss-7 col-xs-8 col-lg-8 col-sm-8 col-sm-8">
                  <div className="d-flex flex-row flex-auto align-items-center">
                    <div className="background-masker avatar-placeholder"></div>
                    <div className="background-masker sm-text-placeholder"></div>
                  </div>
                </div>
                <div className="col-xss-5 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                  <div className="d-flex flex-column flex-auto">
                    <div className="background-masker sm-text-placeholder"></div>
                    <div className="background-masker sm-text-placeholder"></div>
                  </div>
                </div>
                <div className="col-xss-12 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                  <div className="d-flex flex-column flex-auto">
                    <div className="background-masker lg-text-placeholder"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-masker sm-text-placeholder"></div>
            <div className="background-masker sm-text-placeholder"></div>
            <div className="row">
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder"></div>
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder"></div>
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder"></div>
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CourseItemsPlaceholder = (props) => {
  const {repeatTime} = props;
  const placeholders = [];
  for (let i = 0; i < repeatTime; i++) {
    placeholders.push(<CourseItemPlaceholder/>);
  }
  return (
    <div className="timeline-item">
      {placeholders}
    </div>
  )
}




const UserDetailsPlaceholder = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="background-masker header-top"></div>
        <div className="background-masker header-left"></div>
        <div className="background-masker header-right"></div>
        <div className="background-masker header-bottom"></div>
        <div className="background-masker subheader-left"></div>
        <div className="background-masker subheader-right"></div>
        <div className="background-masker subheader-bottom"></div>
        <div className="background-masker content-top"></div>
        <div className="background-masker content-first-end"></div>
        <div className="background-masker content-second-line"></div>
        <div className="background-masker content-second-end"></div>
        <div className="background-masker content-third-line"></div>
        <div className="background-masker content-third-end"></div>
      </div>
    </div>
  )
}

AsyncLoader.propTypes = {
  isFullLoading: React.PropTypes.bool,
  normalPlaceholder: React.PropTypes.bool,
  facebookPlaceholder: React.PropTypes.bool,
  sectionPlaceholder: React.PropTypes.bool,
  loaderType: React.PropTypes.string,
  repeatTime: React.PropTypes.number
};

export default AsyncLoader;