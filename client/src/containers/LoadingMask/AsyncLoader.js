import { Component } from 'react';
import * as React from 'react';
import * as WebContants from '../../constants/WebConstants';
import LoadingIcon from "../../components/Core/Icons/LoadingIcon"

class AsyncLoader extends Component {
  render() {
    const {
      isFullLoading, normalPlaceholder, facebookPlaceholder,
      sectionPlaceholder, buttonPlaceholder, loaderType, repeatTime = 1
    } = this.props;
    if (normalPlaceholder) {
      return (
        <div className={isFullLoading ? 'full-loading' : 'partial-loading'}>
          <div id="spinner">
            <LoadingIcon />
          </div>
        </div>
      );
    } if (sectionPlaceholder) {
      return (
        <div className="section-placeholder">
          <div id="spinner">
            <LoadingIcon />
          </div>
        </div>
      );
    } if (buttonPlaceholder) {
      return (
        <div className="button-placeholder">
          <div id="spinner">
            <LoadingIcon />
          </div>
        </div>
      );
    } if (facebookPlaceholder) {
      switch (loaderType) {
        case WebContants.COURSE_DETAILS_PLACEHOLDER:
          return <CourseDetailsPlaceholder />;
        case WebContants.LESSON_DETAILS_PLACEHOLDER:
          return <LessonDetailsPlaceholder />;
        case WebContants.COURSE_ITEM_PLACEHOLDER:
          return <CourseItemsPlaceholder repeatTime={repeatTime} />;
        case WebContants.USER_DETAILS_PLACEHOLDER:
          return <UserDetailsPlaceholder />;
        case WebContants.USER_ACCOUNT_PLACEHOLDER:
          return <UserAccountPlaceholder numOfline={5} />;
        case WebContants.USER_EDUCATION_PLACEHOLDER:
          return <UserAccountPlaceholder numOfline={3} />;
        case WebContants.USER_CERTIFICATE_PLACEHOLDER:
          return <UserAccountPlaceholder numOfline={3} />;
        case WebContants.TEACHER_DETAIL_PROFILE_PLACEHOLDER:
          return <TeacherDetailProfilePlaceholder numOfline={4} />;
        case WebContants.TEACHER_DETAIL_SHORT_COURSES_PLACEHOLDER:
          return <TeacherDetailShortCoursesPlaceholder repeatTime={repeatTime} />;
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
                  <div className="background-masker image-placeholder course-cover-image-placeholder" />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-8 col-sm-8">
                  <div className="background-masker lg-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className="background-masker sm-text-placeholder" />
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="background-masker sm-text-placeholder" />
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="background-masker sm-text-placeholder" />
                  <div className="background-masker sm-text-placeholder" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const LessonDetailsPlaceholder = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder" />
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder" />
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="background-masker sm-text-placeholder" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="background-masker sm-text-placeholder" />
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="background-masker lg-text-placeholder" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-3">
            <div className="background-masker image-placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseItemPlaceholder = () => {
  return (
    <div className="animated-background">
      <div className="row">
        <div className="col-xss-12 col-xs-3 col-lg-3 col-sm-4 col-md-4">
          <div className="background-masker image-placeholder" />
        </div>
        <div className="col-xss-12 col-xs-12 col-lg-9 col-sm-8 col-md-8">
          <div className="content">
            <div className="background-masker lg-text-placeholder" />
            <div className="content-inner">
              <div className="row align-items-center">
                <div className="col-xss-7 col-xs-8 col-lg-8 col-sm-8 col-sm-8">
                  <div className="d-flex flex-row flex-auto align-items-center">
                    <div className="background-masker avatar-placeholder" />
                    <div className="background-masker sm-text-placeholder" />
                  </div>
                </div>
                <div className="col-xss-5 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                  <div className="d-flex flex-column flex-auto">
                    <div className="background-masker sm-text-placeholder" />
                    <div className="background-masker sm-text-placeholder" />
                  </div>
                </div>
                <div className="col-xss-12 col-xs-12 col-lg-2 col-sm-2 col-md-2">
                  <div className="d-flex flex-column flex-auto">
                    <div className="background-masker lg-text-placeholder" />
                  </div>
                </div>
              </div>
            </div>
            <div className="background-masker sm-text-placeholder" />
            <div className="background-masker sm-text-placeholder" />
            <div className="row">
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder" />
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder" />
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder" />
              </div>
              <div className="col-sm-3">
                <div className="background-masker sm-text-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShortCourseItemPlaceholder = () => {
  return (
    <div className="row">
      <div className="col-xss-12 col-xs-3 col-lg-3 col-sm-4 col-md-4">
        <div className="background-masker image-placeholder" />
      </div>
      <div className="col-xss-12 col-xs-9 col-lg-9 col-sm-8 col-md-8">
        <div className="d-flex flex-column flex-auto">
          <div className="background-masker sm-text-placeholder" />
          <div className="background-masker sm-text-placeholder" />
          <div className="background-masker sm-text-placeholder" />
        </div>
      </div>
    </div>
  );
};

const ShortCoursesPlaceholder = () => {
  return (
    <div className="animated-background">
      <ShortCourseItemPlaceholder />
      <hr className="mt-15 mb-15" />
      <ShortCourseItemPlaceholder />
      <hr className="mt-15 mb-15" />
      <ShortCourseItemPlaceholder />
    </div>
  );
};

const CourseItemsPlaceholder = (props) => {
  const { repeatTime } = props;
  const placeholders = [];
  for (let i = 0; i < repeatTime; i++) {
    placeholders.push(<CourseItemPlaceholder key={`courseItemLine${i}`} />);
  }
  return (
    <div className="timeline-item">
      {placeholders}
    </div>
  );
};

const UserDetailsPlaceholder = () => {
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="dashboard-profile-placeholder text-center">
          <div className="row">
            <div className="col-md-12">
              <div className="background-masker image-placeholder avatar-user" />
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              <div className="background-masker sm-text-placeholder" style={{ width: '50%' }} />
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              <div className="background-masker sm-text-placeholder" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserAccountPlaceholder = (props) => {
  const placeholders = [];
  for (let i = 0; i < props.numOfline; i++) {
    placeholders.push(<UserAccountLine key={`userAccountLine${i}`} />);
  }
  return (
    <div className="timeline-item">
      <div className="animated-background">
        <div className="row">
          <div className="col-md-6">
            <div className="background-masker lg-text-placeholder" />
          </div>
          {placeholders}
        </div>
      </div>
    </div>
  );
};

const UserAccountLine = () => {
  return (
    <div className="col-md-12 col-sm-12">
      <div className="row">
        <div className="col-md-4">
          <div className="background-masker sm-text-placeholder" />
        </div>
        <div className="col-md-8">
          <div className="background-masker sm-text-placeholder" />
        </div>
      </div>
    </div>
  );
};

const TeacherDetailProfilePlaceholder = (props) => {
  const placeholders = [];
  for (let i = 0; i < props.numOfline; i++) {
    placeholders.push(
      <div className="row" key={`TeacherDetailProfilePlaceholder${i}`}>
        <div className="col-md-12 col-sm-12">
          <div className="background-masker sm-text-placeholder mb-10" style={{ width: '70%' }} />
        </div>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row animated-background" style={{ width: '100%' }}>
      <div className="background-masker image-placeholder avatar-teacher-detail" />
      <div style={{ width: '100%' }}>
        {placeholders}
      </div>
    </div>
  );
};

const TeacherDetailShortCoursesPlaceholder = () => {
  return (
    <div className="timeline-item">
      <ShortCoursesPlaceholder />
    </div>
  );
};


AsyncLoader.propTypes = {
  isFullLoading: React.PropTypes.bool,
  normalPlaceholder: React.PropTypes.bool,
  facebookPlaceholder: React.PropTypes.bool,
  sectionPlaceholder: React.PropTypes.bool,
  loaderType: React.PropTypes.string,
  repeatTime: React.PropTypes.number
};

export default AsyncLoader;
