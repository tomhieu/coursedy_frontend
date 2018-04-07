import * as React from "react";
import {Component} from "react";
import * as LessonActions from "../../../actions/LessonActionCreator";
import * as CourseActions from "../../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {CardActions, CardContent, FlatButton} from "material-ui";
import cssModules from "react-css-modules";
import styles from "./SectionDetail.module.scss";
import LessonDetailFormContainer from "../Lesson/LessonDetailFormContainer";
import SectionDetailContainer from "./SectionDetailContainer";
import EditLessonFormContainer from "../Lesson/EditLessonFormContainer";
import {ActionDelete, ContentAddCircle} from "material-ui/svg-icons/index";
import {mStyles} from "../../../utils/CustomStylesUtil";
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import * as asyncActs from "actions/AsyncActionCreator";

class SectionLessonContainer extends Component {

  addLesson(sectionId) {
    this.props.dispatch(LessonActions.addLesson(sectionId));
  }

  saveLesson(lesson) {
    lesson.course_id = this.props.section.course_id;
    lesson.course_section_id = this.props.section.id;
    this.props.dispatch(LessonActions.saveOrUpdateLesson(lesson));
  }

  hideLessonPopup() {
    this.props.dispatch(LessonActions.hideLessonDetailPopup(this.props.section.id))
  }

  saveSection({title}) {
    this.props.dispatch(CourseActions.saveOrUpdateSection(this.props.section.id, title));
  }

  deleteSection(id) {
    this.props.dispatch(CourseActions.deleteSection(id));
  }

  onActivatedField(fieldIds) {
    this.props.dispatch(CourseActions.activatedEditField(fieldIds));
  }

  render() {
    const {section, showPopupEdit = false, activatedField} = this.props;
    return (
      <LoadingMask key={'__section__' + section.id}
                   belongingActions={[asyncActs.ADD_DOCUMENT, asyncActs.ADD_MORE_LESSON_FOR_SECTION,
                     asyncActs.DELETE_DOCUMENT, asyncActs.DELETE_LESSON, asyncActs.SAVE_LESSON,
                     asyncActs.DELETE_SECTION, asyncActs.CREATE_UPDATE_SECTION]}>
        <div className="d-flex flex-auto lesson-container">
          <div className="card flex-auto">
            <div className="card-header" id="headingOne">
              <div className="d-flex flex-horizontal">
                <div className="d-flex flex-auto">
                  <SectionDetailContainer onSubmit={this.saveSection.bind(this)}
                                          section={section} {...this.props}
                                          onActivatedField={this.onActivatedField.bind(this)}>
                  </SectionDetailContainer>
                </div>
                {
                  section.lessons.length > 0 ?
                    (
                      <div className="d-flex flex-auto justify-content-right align-items-center">
                        <span className="section-title" data-toggle="collapse" data-target="#collapseLesson" aria-expanded="true" aria-controls="collapseLesson">
                          {this.context.t('view_details_lesson')}
                        </span>
                      </div>
                    ) : null
                }
              </div>
            </div>
            <div id="collapseLesson" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
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
              <FlatButton label="Add More" onClick={() => this.addLesson(section.id)}
                          secondary={true}
                          style={mStyles.defaultFlatBtn}
                          icon={<ContentAddCircle color="#e27d7f"/>}/>
              <FlatButton label="Delete" onClick={() => this.deleteSection(section.id)}
                          icon={<ActionDelete color="#000000" />}/>
            </div>
          </div>
          <EditLessonFormContainer show={showPopupEdit}
                                   hidePopup={this.hideLessonPopup.bind(this)}
                                   onSubmit={this.saveLesson.bind(this)}
                                   {...this.props}/>
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

export default connect(
  mapStateToProps
)(cssModules(SectionLessonContainer, styles));