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
    this.props.dispatch(LessonActions.saveOrUpdateLesson(Object.assign(lesson, {
      course_section_id: this.props.section.id,
      course_id: this.props.section.course_id
    })));
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

  isActivatedFieldOfLesson(activatedField, lesson) {
    return activatedField != null && activatedField.indexOf("__lesson_" + lesson.title) >= 0;
  }

  render() {
    const {section, showPopupEdit = false, activatedField} = this.props;
    return (
      <LoadingMask key={'__section__' + section.id}
                   belongingActions={[asyncActs.ADD_DOCUMENT_FOR_LESSON, asyncActs.ADD_MORE_LESSON_FOR_SECTION,
                     asyncActs.DELETE_DOCUMENT_FOR_LESSON, asyncActs.DELETE_LESSON, asyncActs.SAVE_LESSON,
                     asyncActs.DELETE_SECTION, asyncActs.CREATE_UPDATE_SECTION]}>
        <div className="d-flex flex-auto">
          <Card className="d-flex flex-auto">
            <CardHeader actAsExpander={section.lessons.length > 0}
                        showExpandableButton={section.lessons.length > 0}
                        className="d-flex flex-auto">
              <div className="d-flex flex-horizontal">
                <div className="section-title">
                  <SectionDetailContainer onSubmit={this.saveSection.bind(this)} section={section} {...this.props}
                                          initialValues={activatedField === "sectionTitleId_" + section.id ? {title: section.title} : {}}>
                  </SectionDetailContainer>
                </div>
              </div>
            </CardHeader>
            <CardText expandable={true} style={mStyles.cartText} className="d-flex flex-auto">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  {
                    section.lessons.map(lesson => (
                      <LessonDetailFormContainer key={'___lesson__' + lesson.id} lesson={lesson}
                                                 onSubmit={this.saveLesson.bind(this)}
                                                 sectionUniqueKey={"__lesson_" + lesson.title}
                                                 initialValues={this.isActivatedFieldOfLesson(activatedField, lesson) === true ? lesson : {}} {...this.props}>
                      </LessonDetailFormContainer>
                    ))
                  }
                </div>
              </div>
            </CardText>
            <CardActions>
              <FlatButton label="Add More" onClick={() => this.addLesson(section.id)}
                          secondary={true}
                          style={mStyles.defaultFlatBtn}
                          icon={<ContentAddCircle color="#e27d7f"/>}/>
              <FlatButton label="Delete" onClick={() => this.deleteSection(section.id)}
                          icon={<ActionDelete color="#000000" />}/>
            </CardActions>
          </Card>
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