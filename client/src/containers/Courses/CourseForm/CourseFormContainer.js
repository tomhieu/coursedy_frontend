import React, {Component} from "react";
import * as CourseActions from "../../../actions/CourseFormActionCreator";
import * as AsynActions from "../../../actions/AsyncActionCreator";
import * as ReferenceActions from "../../../actions/ReferenceActions/ReferenceDataActionCreator";
import {connect} from "react-redux";
import {mStyles} from "../../../utils/CustomStylesUtil";
import {FlatButton} from "material-ui";
import {ContentAddCircle, EditorPublish} from "material-ui/svg-icons/index";
import CourseDetailContainer from "./CourseDetailContainer";
import SimpleDialogComponent from "../../../components/Core/SimpleDialogComponent";
import SectionCreationPopupContainer from "../Section/SectionCreationPopupContainer";
import SectionLessonContainer from "../Section/SectionLessonContainer";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {FETCH_DETAIL_COURSE} from "../../../actions/AsyncActionCreator";
import {FETCH_LIST_SECTION} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";
import {CREATE_UPDATE_SECTION} from "../../../actions/AsyncActionCreator";

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    this.courseId = this.props.match.params.id;
  }

  componentWillMount() {
    if (this.courseId) {
      this.props.loadCourseDetails(this.courseId);
      this.props.loadSectionDetails(this.courseId);
    } else {
      this.props.createNewCourse();
    }
    this.props.fetchCourseCategories();
  }

  addNewSection() {
    this.props.addNewSection();
  }

  validateBeforePublishCourse() {
    this.props.validateBeforePublishCCourse();
  }

  publishCourse() {
    this.props.doPublishCourse(this.courseId);
  }

  cancelPublishCourse() {
    this.props.cancelPublishCourse();
  }

  saveSection({title}) {
    this.props.saveOrUpdateSection(this.courseId, title, name);
  }

  cancelPopup() {
    this.props.cancelCoursePopup();
    this.context.router.history.push('/dashboard/courses/list/');
  }

  render() {
    const {editMode, listSection, courseTitle, createCourseSucess, publishCourse, isFetching} = this.props;

    return (
      <div className="row dashboard-panel course-details-container">
        <div className="col-sm-12 col-md-12">
          <LoadingMask placeholderId="courseDetailPlaceholder"
                       normalPlaceholder={false}
                       facebookPlaceholder={true}
                       loaderType="COURSE_DETAILS_PLACEHOLDER">
            {
              !isFetching ? (
                <div className="container">
                  <CourseDetailContainer courseId={this.courseId}
                                         {...this.props}>
                  </CourseDetailContainer>
                  <SimpleDialogComponent title={this.context.t('create_course_sucessfully')}
                                         show={createCourseSucess}
                                         cancelCallback={this.cancelPopup.bind(this)}>
                    <div className="d-flex flex-vertical">
                      <span>{this.context.t('create_course_sucessfully_message', {title: 'Testing Dialog'})}</span>
                    </div>
                  </SimpleDialogComponent>
                </div>
              ) : <div className="d-flex flex-g1 waiting-container"></div>
            }
          </LoadingMask>
        </div>
        {
          editMode ? (
            <div className="col-sm-12 col-md-12">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <FlatButton label={this.context.t('lesson_link_edit')}
                                    style={mStyles.defaultFlatBtn}
                                    secondary={true}
                                    onClick={this.addNewSection.bind(this)}
                                    icon={<ContentAddCircle color="#e27d7f"/>}/>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <FlatButton label={this.context.t('course_publish')}
                                    style={mStyles.defaultFlatBtn}
                                    secondary={true}
                                    onClick={this.validateBeforePublishCourse.bind(this)}
                                    icon={<EditorPublish color="#e27d7f"/>}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <LoadingMask placeholderId="listLessonDetailPlaceholder"
                                 normalPlaceholder={false}
                                 facebookPlaceholder={true}
                                 loaderType="LESSON_DETAILS_PLACEHOLDER"
                                 repeatTime={2}>
                      <div className="row flex-g1">
                        {
                          listSection.map((section) =>
                            <div className="col-sm-12 col-md-12 mb-3">
                              <SectionLessonContainer
                                section={section}
                                key={'__section__' + section.id}
                                showPopupEdit={section.showLessonPopup}
                                {...this.props}>
                              </SectionLessonContainer>
                            </div>
                          )
                        }
                      </div>
                    </LoadingMask>
                  </div>
                  <SectionCreationPopupContainer courseId={this.courseId} onSubmit={this.saveSection.bind(this)}>
                  </SectionCreationPopupContainer>
                </div>
              </div>
              <SimpleDialogComponent title={this.context.t('popup_warning_publish_course_title')}
                                     show={publishCourse}
                                     acceptBtn={this.context.t("course_publish")}
                                     cancelCallback={this.cancelPublishCourse.bind(this)}
                                     acceptCallback={this.publishCourse.bind(this)}>
                <div className="d-flex flex-vertical">
                  <span>{this.context.t('popup_warning_publish_course_message_1', {course_title: courseTitle})}</span>
                </div>
                {
                  listSection.length === 0 ? (
                    <div className="d-flex flex-vertical">
                      <span>{this.context.t("popup_warning_publish_course_message_2")}</span>
                      <span>{this.context.t("popup_warning_publish_course_message_3", {course_title: courseTitle})}</span>
                    </div>
                  ) : null
                }
              </SimpleDialogComponent>
            </div>
          ) : null
        }
      </div>
    )
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
  router: React.PropTypes.object
};

CourseFormContainer.propTypes = {};

const mapStateToProps = (state) => {
  const {courseDetails} = state;
  const {listSection, editMode, activatedField, createCourseSucess, courseData = {}, publishCourse, isFetching} = courseDetails;
  const {cover_image, title} = courseData;
  return {
    listSection, editMode, activatedField, createCourseSucess, cover_image, publishCourse, courseTitle: title, isFetching
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadCourseDetails: (courseId) => dispatch({
    type: FETCH_DETAIL_COURSE,
    payload: Network().get(/courses/ + courseId),
    meta: 'courseDetailPlaceholder'
  }),
  loadSectionDetails: (courseId) => dispatch({
    type: FETCH_LIST_SECTION,
    payload: Network().get('/course_sections?course_id=' + courseId),
    meta: 'listLessonDetailPlaceholder'
  }),
  saveOrUpdateSection: (courseId, title, name) => dispatch({
    type: CREATE_UPDATE_SECTION,
    payload: Network().post('course_sections', {course_id: courseId, title}),
    meta: 'lessonDetailPlaceholder'
  }),
  fetchCourseCategories: () => dispatch(ReferenceActions.fetchCourseCategories()),
  createNewCourse: () => dispatch(CourseActions.createNewCourse()),
  addNewSection: () => dispatch(CourseActions.addNewSection()),
  validateBeforePublishCCourse: () => dispatch(CourseActions.validateBeforePublishCCourse()),
  doPublishCourse: (courseId) => dispatch(CourseActions.publishCourse(courseId)),
  cancelPublishCourse: () => dispatch({type: AsynActions.CANCEL_PUBLISH_COURSE}),
  cancelCoursePopup: () => dispatch({type: AsynActions.CLOSE_COURSE_POPUP})
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(CourseFormContainer);
