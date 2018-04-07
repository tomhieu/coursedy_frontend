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

class CourseFormContainer extends Component {
  constructor(props) {
    super(props);
    this.courseId = this.props.match.params.id;
  }


  componentWillMount() {
    if (this.courseId) {
      this.props.dispatch(CourseActions.loadCourseDetail(this.courseId));
    } else {
      this.props.dispatch(CourseActions.createNewCourse());
    }
    this.props.dispatch(ReferenceActions.fetchCourseCategories())
  }

  addNewSection() {
    this.props.dispatch(CourseActions.addNewSection());
  }

  validateBeforePublishCourse() {
    this.props.dispatch(CourseActions.validateBeforePublishCCourse());
  }

  publishCourse() {
    this.props.dispatch(CourseActions.publishCourse(this.courseId));
  }

  canclePublishCourse() {
    this.props.dispatch({
      type: AsynActions.CANCEL_PUBLISH_COURSE
    });
  }

  saveSection({title}) {
    this.props.dispatch(CourseActions.saveOrUpdateSection(this.courseId, title, name));
  }

  cancelPopup() {
    this.props.dispatch({type: AsynActions.CLOSE_COURSE_POPUP});
    this.context.router.history.push('/dashboard/courses/list/');
  }

  render() {
    const {editMode, listSection, courseTitle, createCourseSucess, publishCourse, isFetching} = this.props;

    return (
      <div className="row dashboard-panel">
        <div className="col-sm-12 col-md-12">
          <LoadingMask belongingActions={[AsynActions.CREATE_NEW_COURSE, AsynActions.UPDATE_COURSE, AsynActions.FETCH_DETAIL_COURSE, AsynActions.FETCH_CATEGORIES]}>
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
                <div className="col-sm-12 col-md-12">
                  {
                    listSection.map((section) =>
                      <SectionLessonContainer
                        section={section}
                        key={'__section__' + section.id}
                        showPopupEdit={section.showLessonPopup}
                        {...this.props}>
                      </SectionLessonContainer>)
                  }
                </div>
                <SectionCreationPopupContainer courseId={this.courseId} onSubmit={this.saveSection.bind(this)}>
                </SectionCreationPopupContainer>
              </div>
              <SimpleDialogComponent title={this.context.t('popup_warning_publish_course_title')}
                                     show={publishCourse}
                                     acceptBtn={this.context.t("course_publish")}
                                     cancelCallback={this.canclePublishCourse.bind(this)}
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

export default connect(
  mapStateToProps
)(CourseFormContainer);
