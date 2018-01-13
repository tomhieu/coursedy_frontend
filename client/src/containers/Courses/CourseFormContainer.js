import React, {Component} from "react";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import * as FilterActions from "../../actions/CourseFilterActionCreator";
import {connect} from "react-redux";
import SectionCreationPopupContainer from "./SectionCreationPopupContainer";
import SectionLessonContainer from "./SectionLessonContainer";
import {mStyles} from "../../utils/CustomStylesUtil";
import {FlatButton} from "material-ui";
import {ContentAddCircle, EditorPublish} from "material-ui/svg-icons/index";
import {red900} from "material-ui/styles/colors";
import CourseDetailContainer from "./CourseDetailContainer";
import LoadingMask from "../../components/LoadingMask/LoadingMask";
import SimpleDialogComponent from "../../components/Core/SimpleDialogComponent";

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
    this.props.dispatch(FilterActions.fetchCategories())
  }

  onActivatedField(fieldId) {
    this.props.dispatch(CourseActions.activatedEditField(fieldId));
  }

  onClosedField(fieldId) {
    this.props.dispatch(CourseActions.closedEditField(fieldId));
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
      type: CourseActions.CANCEL_PUBLISH_COURSE
    });
  }

  cancelPopup() {
    this.props.dispatch(CourseActions.createNewCourse());
    this.context.router.history.push('/dashboard/courses/list/');
  }

  render() {
    const {editMode, listSection, courseTitle, createCourseSucess, publishCourse} = this.props;
    return (
      <div className="row dashboard-panel">
        <div className="col-sm-12 col-md-12">
          <CourseDetailContainer courseId={this.courseId}
                                 onActivatedField={this.onActivatedField.bind(this)}
                                 onClosedField={this.onClosedField.bind(this)}
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
                  <LoadingMask>
                    {
                      listSection.map((section) =>
                        <SectionLessonContainer
                          section={section}
                          key={'__section__' + section.id}
                          showPopupEdit={section.showLessonPopup}
                          onActivatedField={this.onActivatedField.bind(this)}
                          onClosedField={this.onClosedField.bind(this)}
                          {...this.props}>
                        </SectionLessonContainer>)
                    }
                  </LoadingMask>
                </div>
                <SectionCreationPopupContainer courseId={this.courseId}>
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
  const {CourseFormComponent} = state;
  const {listSection, editMode, activatedField, createCourseSucess, courseData = {}, publishCourse} = CourseFormComponent;
  const {cover_image, title} = courseData;
  return {
    listSection, editMode, activatedField, createCourseSucess, cover_image, publishCourse, courseTitle: title
  };
};

export default connect(
  mapStateToProps
)(CourseFormContainer);
