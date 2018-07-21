import * as React from "react";
import {Component} from "react";
import * as LessonActions from "../../../actions/LessonActionCreator";
import * as CourseActions from "../../../actions/CourseFormActionCreator";
import * as MainActions from "../../../actions/MainActionCreator";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import styles from "./SectionDetail.module.scss";
import LessonDetailFormContainer from "../Lesson/LessonDetailFormContainer";
import SectionDetailContainer from "./SectionDetailContainer";
import EditLessonFormContainer from "../Lesson/EditLessonFormContainer";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {
  CREATE_UPDATE_SECTION,
  DELETE_SECTION,
  FETCH_LIST_SECTION,
  SAVE_LESSON
} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";
import * as WebConstants from "../../../constants/WebConstants";
import FlatButton from "../../../components/Core/FlatButton/FlatButton";

class SectionLessonContainer extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.section);
  }
  addLesson(sectionId) {
    this.props.addLesson(sectionId);
  }

  saveLesson(lesson) {
    lesson.course_id = this.props.section.course_id;
    lesson.course_section_id = this.props.section.id;
    this.props.saveOrUpdateLesson(lesson);
  }

  hideLessonPopup() {
    this.props.hideLessonDetailPopup(this.props.section.id);
  }

  saveSection({title}) {
    this.props.saveOrUpdateSection(this.props.section.id, title);
  }

  deleteSection(id) {
    this.props.deleteSection(id);
  }

  onActivatedField(fieldIds) {
    this.props.activatedEditField(fieldIds);
  }

  render() {
    const {section, showPopupEdit = false, activatedField} = this.props;
    return (
      <LoadingMask placeholderId={"sectionLessonPlaceholder" + section.id}
                   normalPlaceholder={false}
                   facebookPlaceholder={true}
                   loaderType={WebConstants.LESSON_DETAILS_PLACEHOLDER}>
        <div className="d-flex flex-auto lesson-container">
          <div className="card flex-auto">
            <div className="card-header" id="headingOne">
              <div className="d-flex flex-horizontal">
                <div className="d-flex flex-auto">
                  <SectionDetailContainer onSubmit={this.saveSection.bind(this)}
                                          section={section} {...this.props}
                                          form={'SectionDetailForm' + section.id}
                                          onActivatedField={this.onActivatedField.bind(this)}>
                  </SectionDetailContainer>
                </div>
                {
                  section.lessons.length > 0 ?
                    (
                      <div className="d-flex flex-auto justify-content-right align-items-center">
                        <span className="section-title" data-toggle="collapse" data-target={"#collapseLesson" + section.id} aria-expanded="true" aria-controls="collapseLesson">
                          {/*{this.context.t('view_details_lesson')}*/}
                        </span>
                      </div>
                    ) : null
                }
              </div>
            </div>
            <div id={"collapseLesson" + section.id} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  {
                    section.lessons.map(lesson => (
                      <LessonDetailFormContainer key={'___lesson__' + lesson.id} lesson={lesson}
                                                 onSubmit={this.saveLesson.bind(this)}
                                                 sectionUniqueKey={"__lesson_" + lesson.id}
                                                 onActivatedField={this.onActivatedField.bind(this)}
                                                 {...this.props}>
                      </LessonDetailFormContainer>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="card-actions">
              <FlatButton label={this.context.t('add_more_lesson')} onClick={() => this.addLesson(section.id)}>
                <svg viewBox="0 0 24 24" className="material-icon primary" height="18" width="18">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
                </svg>
              </FlatButton>
              <FlatButton label={this.context.t('delete_lesson')} onClick={() => this.props.openConfirmationPopup(
                this.context.t('warning_delete_section_title'),
                this.context.t('warning_delete_section_message', {sectionName: <strong>{section.title}</strong>, seperator: <br></br>}),
                this.deleteSection.bind(this, section.id))} secondary={true}>
                <svg viewBox="0 0 24 24" className="material-icon secondary" height="18" width="18">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
              </FlatButton>
            </div>
          </div>
          {
            showPopupEdit ? <EditLessonFormContainer show={showPopupEdit}
                                                     hidePopup={this.hideLessonPopup.bind(this)}
                                                     onSubmit={this.saveLesson.bind(this)}
                                                     {...this.props}/> : null
          }

        </div>
      </LoadingMask>
    )
  }
}

SectionLessonContainer.propTypes = {
  section: React.PropTypes.object.isRequired
};

SectionLessonContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {activatedField: state.courseDetails.activatedField};
};

const mapDispatchToProps = (dispatch) => ({
  saveOrUpdateLesson: (lesson) => dispatch({
    type: SAVE_LESSON,
    payload: lesson.id !== undefined ? Network().update('lessons/' + lesson.id, lesson)
      : Network().post('lessons', lesson),
    meta: 'sectionLessonPlaceholder' + lesson.course_section_id
  }),
  loadSectionDetails: (courseId) => dispatch({
    type: FETCH_LIST_SECTION,
    payload: Network().get('/course_sections?course_id=' + courseId),
    meta: 'listLessonDetailPlaceholder'
  }),
  addLesson: (sectionId) => dispatch(LessonActions.addLesson(sectionId)),
  hideLessonDetailPopup: (sectionId) => dispatch(LessonActions.hideLessonDetailPopup(sectionId)),
  saveOrUpdateSection: (id, title) => dispatch({
    type: CREATE_UPDATE_SECTION,
    payload: Network().update('course_sections/' + id, {title}),
    meta: 'sectionLessonPlaceholder' + id
  }),
  deleteSection: (id) => dispatch({
    type: DELETE_SECTION,
    payload: Network().delete('course_sections/' + id),
    meta: 'sectionLessonPlaceholder' + id
  }),
  activatedEditField: (fieldIds) => dispatch(CourseActions.activatedEditField(fieldIds)),
  openConfirmationPopup: (title, message, callback) => dispatch(MainActions.openConfirmationPopup(title, message, callback))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(SectionLessonContainer, styles));