import * as React from "react";
import {Component} from "react";
import FormField from "../Core/FormField";
import {renderPreviewFile} from "../CustomComponents";
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
        return (
            <div className="d-flex flex-vertical">
                <div>
                    <FormField formGroupId="lesson_title_Id" formLabel={this.context.t("lesson_name")}
                               isMandatoryField={true} formControlName="title" typeField="custom_input"/>
                </div>
                <div>
                    <FormField formGroupId="lessonPeriodId" formLabel={this.context.t("lesson_period")}
                               isMandatoryField={true} formControlName="period" typeField="custom_input"/>
                </div>
                <div>
                    <FormField formGroupId="lessonDocumentId" formLabel={this.context.t("lesson_material")} onUpload={this.onDropDocument.bind(this)}
                               isMandatoryField={true} formControlName="documents" typeField="upload_file"/>
                    <div className="d-flex flex-vertical ml-15 mt-5">
                        {
                            this.state.documents.map((doc) => renderPreviewFile(doc, this.onDeleteDocumentLesson.bind(this)))
                        }
                    </div>
                </div>
                <div>
                    <FormField formGroupId="lessonDesciptionId" formLabel={this.context.t("lesson_name")}
                               isMandatoryField={true} formControlName="description" typeField="custom_textarea"/>
                </div>
            </div>
        )
    }
}

LessonDetailComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
}