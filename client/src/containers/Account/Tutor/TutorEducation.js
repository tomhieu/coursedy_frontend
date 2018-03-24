import * as React from "react";
import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import styles from "./TutorEducation.module.scss";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import {
  addNewDocument,
  downloadDegree,
  loadListDegreesData,
  removeNewDocument,
  removeUploadedDocument,
  loadListSkillData,
} from "../../../actions/TutorAccountActionCreator";
import {fetchTutor} from "actions/TutorProfileActionCreator"
import {updateTutorEducation} from "actions/TutorAccountActionCreator";
import {renderPreviewFile} from "../../../components/Core/CustomComponents";

class TutorEducation extends Component {
  constructor(props) {
    super(props);
    this.updateEducation.bind(this);
  }


  updateEducation(data) {
    this.props.dispatch(updateTutorEducation(this.props.tutor.id, data));
  }

  render() {
    const {handleSubmit, listLevel, degrees, skills, certificates, uploadFiles, skillSet, certificateSet} = this.props;
    return (
      <div className='row'>
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account_tutor_edu_title")}</span>
          </div>
          <form onSubmit={handleSubmit(this.updateEducation.bind(this))}>
            <div>
              <FormField formGroupId="titleId" formLabel={this.context.t("account.tutot.edu.ocupation")}
                         isMandatoryField={true} formControlName="title" typeField="custom_input"/>
            </div>
            <div>
              <FormField formGroupId="descriptionId" formLabel={this.context.t("account.tutor.edu.description")}
                         isMandatoryField={true} formControlName="description" typeField="custom_textarea"/>
            </div>

            {/*<div>*/}
              {/*<ListUploadedDegrees degrees={degrees} download={(fileId) => this.doDownload(fileId)}*/}
                                   {/*delete={(fileId) => this.doDeleteUploadedFile(fileId)}/>*/}
            {/*</div>*/}
            {/*<div>*/}
              {/*<div className={styles.dropzoneEduContainer}>*/}
                {/*<FormField formGroupId="degreesId" formLabel={this.context.t("account.tutot.edu.degree.title")}*/}
                           {/*onUpload={this.doUploadFile.bind(this)} isMandatoryField={false} formControlName="degrees"*/}
                           {/*typeField="upload_file"/>*/}
                {/*<div className="d-flex flex-vertical ml-15 mr-15">*/}
                  {/*{uploadFiles.map(file => renderPreviewFile(file, this.doDeleteNewUploadFile.bind(this)))}*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
            <div>
              <FormField formGroupId="skillsId" formLabel={this.context.t("account_tutor_skill_title")}
                         options={skillSet} formControlName="categories" typeField="multi_select"/>
            </div>

            <div className='form-group'>
              <button type="submit" className="btn btn-primary mr-10">{this.context.t("save")}</button>
              <button type="button" className="btn btn-default btn-small margin-left-10 cancel-button"
                      onClick={this.props.cancel}>
                {this.context.t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

function ListUploadedDegrees(props) {
  if (Array.isArray(props.degrees)) {
    return (
      <div className="uploaded-degrees-container col-md-12 col-sm-12">
        {props.degrees.map((degree) => <div key={degree.id}>{renderUploadedDegree(degree, props)}</div>)}
      </div>
    )
  } else {
    return <div></div>
  }
}


function renderUploadedDegree(degree, props) {
  let previewImage = "pdf-image-preview";
  if (degree.extension === "docx") {
    previewImage = "doc-image-preview";
  }
  return (
    <div className="d-flex flex-horizontal mt-10">
      <div className={previewImage}></div>
      <span className="degree-filename ml-10">{degree.name}</span>
      <a className="icon-download ml-10" onClick={() => props.download(degree.id)} title={degree.name}></a>
      <a className="icon-delete ml-10" onClick={() => props.delete(degree.id)} title={degree.name}></a>
    </div>
  )
}

TutorEducation.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {EducationData, addNewDocumentFile} = state;
  const {degrees, skillSet} = EducationData;
  const {uploadFiles} = addNewDocumentFile;
  const tutor = state.TutorAccount.tutor
  const skills = tutor.categories.map((t) => {
    return t.id
  })

  return {
    degrees,
    uploadFiles,
    skillSet,
    tutor,
    initialValues: {...tutor, categories: skills }
  }
};

export default connect(mapStateToProps)(reduxForm({
  form: 'tutorEducation',
  fields: ['title', 'description', 'categories'],
  enableReinitialize: true,
  onSubmit: updateTutorEducation(),
})(cssModules(TutorEducation, styles)));

