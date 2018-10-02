import React, {Component} from 'react';
import {connect} from 'react-redux';
import Network from 'utils/network';
import * as CourseActions from '../../../actions/CourseFormActionCreator';
import * as AsynActions from '../../../actions/AsyncActionCreator';
import {
  CREATE_UPDATE_SECTION,
  FETCH_BBB_ROOM_LINK,
  FETCH_DETAIL_COURSE,
  FETCH_LIST_SECTION
} from '../../../actions/AsyncActionCreator';
import * as ReferenceActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator';
import CourseDetailContainer from './CourseDetailContainer';
import SimpleDialogComponent from '../../../components/Core/SimpleDialogComponent';
import SectionCreationPopupContainer from '../Section/SectionCreationPopupContainer';
import SectionLessonContainer from '../Section/SectionLessonContainer';
import LoadingMask from '../../LoadingMask/LoadingMask';
import FlatButton from '../../../components/Core/FlatButton/FlatButton';
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';
import {TutorNavigationTab} from '../../../constants/TutorNavigationTab';
import {CourseStatus} from '../../../constants/CourseStatus';

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    this.courseId = props.courseId;
  }

  componentWillMount() {
    if (this.courseId) {
      this.props.loadCourseDetails(this.courseId);
      this.props.loadSectionDetails(this.courseId);
    } else {
      this.props.createNewCourse();
    }
    this.props.fetchCourseCategories();
    this.props.activateTab(TutorNavigationTab.COURSE_ADD);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      this.props.fetchCourseCategories();
    }
  }

  addNewSection() {
    this.props.addNewSection();
  }

  validateBeforePublishCourse() {
    this.props.validateBeforePublishCCourse();
  }

  publishCourse() {
    this.props.doPublishCourse(this.courseId);
    this.cancelPublishCourse();
  }

  cancelPublishCourse() {
    this.props.cancelPublishCourse();
  }

  saveSection({ title }) {
    this.props.saveOrUpdateSection(this.courseId, title, name);
  }

  cancelPopup() {
    this.props.cancelCoursePopup();
    this.context.router.history.push('/dashboard/courses/list/');
  }

  render() {
    const {
      editMode, listSection, courseTitle, createCourseSucess, publishCourse, isFetching, canEditable
    } = this.props;

    return (
      <div className="row course-details-container">
        <div className="col-sm-12 col-md-12">
          <div className="dashboard-content-section">
            <LoadingMask
              placeholderId="courseDetailPlaceholder"
              normalPlaceholder={false}
              facebookPlaceholder
              loaderType="COURSE_DETAILS_PLACEHOLDER"
            >
              {
                !isFetching ? (
                  <div className="full-width">
                    <CourseDetailContainer
                      courseId={this.courseId}
                      {...this.props}
                    />
                    <SimpleDialogComponent
                      title={this.context.t('create_course_sucessfully')}
                      show={createCourseSucess}
                      cancelCallback={this.cancelPopup.bind(this)}
                      acceptCallback={this.cancelPopup.bind(this)}
                    >
                      <div className="d-flex flex-vertical">
                        <span>{this.context.t('create_course_sucessfully_message', {
                          title: <strong>{courseTitle}</strong> ,
                          notReadyStatus: <strong>{this.context.t('not_publish_course_status')}</strong>
                        })}</span>
                        <span className="mt-5">{this.context.t('create_course_sucessfully_message_2', {
                          readyButton: <strong>{this.context.t('course_publish')}</strong>,
                          readyStatus: <strong>{this.context.t('publish_course_status')}</strong>
                        })}</span>
                      </div>
                    </SimpleDialogComponent>
                  </div>
                ) : <div className="d-flex flex-g1 waiting-container" />
              }
            </LoadingMask>
          </div>
        </div>
        {
          editMode ? (
            <div className="col-sm-12 col-md-12">
              <div className="full-width">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <FlatButton
                          label={this.context.t('lesson_link_edit')}
                          secondary={false}
                          onClick={this.addNewSection.bind(this)}
                        >
                          <svg viewBox="0 0 24 24" className="material-icon primary" height="18" width="18">
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                            />
                          </svg>
                        </FlatButton>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        {
                          canEditable ?
                            <FlatButton
                              label={this.context.t('course_publish')}
                              secondary
                              onClick={this.validateBeforePublishCourse.bind(this)}>
                              <svg className="material-icon" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" />
                              </svg>
                            </FlatButton> : null
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <LoadingMask
                      placeholderId="listLessonDetailPlaceholder"
                      normalPlaceholder={false}
                      facebookPlaceholder
                      loaderType="LESSON_DETAILS_PLACEHOLDER"
                      repeatTime={2}
                    >
                      <div className="row flex-g1">
                        {
                          listSection.map(section => (
                            <div className="col-sm-12 col-md-12 mb-3">
                              <SectionLessonContainer
                                section={section}
                                key={`__section__${section.id}`}
                                showPopupEdit={section.showLessonPopup}
                                {...this.props}
                              />
                            </div>
                          ))
                        }
                      </div>
                    </LoadingMask>
                  </div>
                  <SectionCreationPopupContainer courseId={this.courseId} onSubmit={this.saveSection.bind(this)} />
                </div>
              </div>
              <SimpleDialogComponent
                title={this.context.t('popup_warning_publish_course_title')}
                show={publishCourse}
                acceptBtn={this.context.t('course_publish')}
                cancelCallback={this.cancelPublishCourse.bind(this)}
                acceptCallback={this.publishCourse.bind(this)}
              >
                <div className="d-flex flex-vertical">
                  <span>{this.context.t('popup_warning_publish_course_message_1', { course_title: courseTitle })}</span>
                </div>
                {
                  listSection.length === 0 ? (
                    <div className="d-flex flex-vertical">
                      <span>{this.context.t('popup_warning_publish_course_message_2')}</span>
                      <span>{this.context.t('popup_warning_publish_course_message_3', { course_title: courseTitle })}</span>
                    </div>
                  ) : null
                }
              </SimpleDialogComponent>
            </div>
          ) : null
        }
      </div>
    );
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

CourseFormContainer.propTypes = {
  courseId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ])
};

const mapStateToProps = (state) => {
  const { courseDetails, TutorAccountReducer } = state;
  const { lang } = state.i18nState;

  const {
    listSection, editMode, activatedField, createCourseSucess, courseData = {}, publishCourse, isFetching
  } = courseDetails;
  const {
    cover_image, title,
    bigbluebutton_room, status
  } = courseData;
  const canEditable = status === CourseStatus.NOT_STARTED;
  return {
    listSection,
    editMode,
    activatedField,
    createCourseSucess,
    cover_image,
    publishCourse,
    courseTitle: title,
    isFetching,
    bbbRoomSlug: bigbluebutton_room ? bigbluebutton_room.slug : undefined,
    canEditable,
    lang
  };
};

const mapDispatchToProps = dispatch => ({
  loadCourseDetails: courseId => dispatch({
    type: FETCH_DETAIL_COURSE,
    payload: Network().get(/courses/ + courseId),
    meta: 'courseDetailPlaceholder'
  }),
  loadSectionDetails: courseId => dispatch({
    type: FETCH_LIST_SECTION,
    payload: Network().get(`/course_sections?course_id=${courseId}`),
    meta: 'listLessonDetailPlaceholder'
  }),
  saveOrUpdateSection: (courseId, title, name) => dispatch({
    type: CREATE_UPDATE_SECTION,
    payload: Network().post('course_sections', { course_id: courseId, title }),
    meta: 'lessonDetailPlaceholder'
  }),
  fetchCourseCategories: () => dispatch(ReferenceActions.fetchCourseCategories()),
  createNewCourse: () => dispatch(CourseActions.createNewCourse()),
  addNewSection: () => dispatch(CourseActions.addNewSection()),
  validateBeforePublishCCourse: () => dispatch(CourseActions.validateBeforePublishCCourse()),
  doPublishCourse: courseId => dispatch(CourseActions.publishCourse(courseId)),
  cancelPublishCourse: () => dispatch({ type: AsynActions.CANCEL_PUBLISH_COURSE }),
  cancelCoursePopup: () => dispatch({ type: AsynActions.CLOSE_COURSE_POPUP }),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  createClassRoom: slug => dispatch({
    type: FETCH_BBB_ROOM_LINK,
    payload: Network().get(`rooms/${slug}/join`, {}, true).then((res) => {
      window.open(res.url, '_blank');
    })
  })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CourseFormContainer);
