import * as React from "react";
import {Component} from "react";
import FormField from "../Core/FormField";
import {renderPreviewFile} from "../Core/CustomComponents";

export class LessonDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {documents: []}
  }

  onDropDocument(doc) {
    let copyDocuments = this.state.documents.concat();
    copyDocuments.push(doc);
    this.setState({documents: copyDocuments});
    this.props.addDocumentForLesson(doc);
  }

  onDeleteDocumentLesson(docUid) {
    let copyDocuments = this.state.documents.filter(doc => doc.uid === docUid);
    this.setState({documents: copyDocuments});
    this.props.onDeleteDocumentLesson(docUid);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form padding-15">
        <div className="d-flex flex-vertical">
          <div>
            <FormField fieldId="lesson_title_Id" fieldLabel={this.context.t("lesson_name")}
                       isMandatoryField={true} formControlName="title" typeField="custom_input"/>
          </div>
          <div>
            <FormField fieldId="lessonPeriodId" fieldLabel={this.context.t("lesson_period")}
                       isMandatoryField={true} formControlName="period" typeField="custom_input"/>
          </div>
          <div>
            <FormField fieldId="lessonDocumentId" fieldLabel={this.context.t("lesson_material")}
                       onUpload={this.onDropDocument.bind(this)}
                       isMandatoryField={true} formControlName="documents" typeField="upload_file"/>
            <div className="d-flex flex-vertical ml-15 mt-5">
              {
                this.state.documents.map((doc) => renderPreviewFile(doc, this.onDeleteDocumentLesson.bind(this)))
              }
            </div>
          </div>
          <div>
            <FormField fieldId="lessonDesciptionId" fieldLabel={this.context.t("lesson_name")}
                       isMandatoryField={true} formControlName="description" typeField="custom_textarea"/>
          </div>
        </div>
      </form>
    )
  }
}

LessonDetailComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}