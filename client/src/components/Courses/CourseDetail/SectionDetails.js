import {Component} from "react";
import * as React from "react";
import LessonDetails from "./LessonDetails";
import DetailsIcon from "../../Core/Icons/DetailsIcon";
import CheckIcon from "../../Core/Icons/CheckIcon";

class SectionDetails extends Component {
  constructor() {
    super();
    this.state = {showLesson: true}
  }
  onClickHeader() {
    const currentStatus = this.state.showLesson;
    this.setState({showLesson: !currentStatus});
  }
  render() {
    const { section } = this.props;
    return (
      <div className="card flex-auto">
        <div className="card-header" onClick={this.onClickHeader.bind(this)} data-toggle="collapse"
             data-target={"#collapseLesson" + section.id}
             aria-expanded="true"
             aria-controls="collapseLesson" id="headingOne">
          <div className="d-flex flex-horizontal">
            <div className="section-view-icon">
              {
                !this.state.showLesson ? <DetailsIcon width={15} height={15} fillColor="#1BC8BA"></DetailsIcon> :
                  <CheckIcon width={15} height={15} fillColor="#1BC8BA"></CheckIcon>
              }
            </div>
            <div className="d-flex flex-auto">
              {section.title}
            </div>
            {
              section.lessons.length > 0 ?
                (
                  <div className="d-flex flex-auto justify-content-right align-items-center">
                    <span className="section-title">
                      {this.context.t('section_lesson_count', {lessonCount: section.lessons.length})}
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
                section.lessons.map((lesson, index) => (
                  <LessonDetails lesson={lesson} index={index} key={index}></LessonDetails>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SectionDetails.propTypes = {
  section: React.PropTypes.object.isRequired
};

SectionDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SectionDetails;
