import * as React from "react";
import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import styles from "./TutorEducation.module.scss";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import {
    addNewDocument, downloadDegree, loadListCertificatesData, loadListDegreesData, loadListSkillData,
    loadTutorEducationData, removeNewDocument, removeUploadedDocument
} from "../../../actions/TutorAccountCreator";
import {TT} from "../../../utils/locale";
import {updateTutorEducation} from "actions/TutorAccountCreator";


class TutorEducation extends Component {
    constructor(props) {
        super(props);
        this.updateEducation.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(loadTutorEducationData());
        this.props.dispatch(loadListDegreesData());
        this.props.dispatch(loadListSkillData())
        this.props.dispatch(loadListCertificatesData())
    }

    doDownload(documentId) {
        this.props.dispatch(downloadDegree(documentId));
    }

    doDeleteUploadedFile(documentId) {
        this.props.dispatch(removeUploadedDocument(documentId));
    }

    doDeleteNewUploadFile(fileId) {
        this.props.dispatch(removeNewDocument(fileId));
    }

    doUploadFile(file) {
        this.props.dispatch(addNewDocument(file));
    }

    renderPreviewFile(file) {
        let previewClass = "pdf-image-preview";
        if (file.extension === "docx") {
            previewClass = "doc-image-preview";
        }
        return (
            <div className="d-flex flex-horizontal mt-10" key={file.uid}>
                <div className={previewClass}></div>
                <div className="file-name-wrapper">
                    <span className="degree-filename ml-10" title={file.fileName}>{file.fileName}</span>
                </div>
                <a className="icon-delete ml-10" onClick={() => this.doDeleteNewUploadFile(file.uid)} title={file.fileName}></a>
            </div>
        )
    }

    updateEducation(e) {
        const {skills, certificates, degrees, uploadFiles} =  this.props;
        this.props.dispatch(updateTutorEducation({level: e.level, skills: skills,
                        certificates: certificates, school: e.school,
                        degrees: degrees, newFiles: uploadFiles}));
    }

    render() {
        const {handleSubmit, listLevel, degrees, skills, certificates, uploadFiles, skillSet, certificateSet} =  this.props;
        return (
            <div className="col-md-12 col-sm-12">
                <div className="block-title">
                    <span className="text-uppercase bold">{this.context.t("account_tutor_edu_title")}</span>
                </div>
                <form onSubmit={handleSubmit(this.updateEducation.bind(this))}>
                    <div>
                        <FormField formGroupId="levelId" formLabel={this.context.t("account.tutot.edu.level.title")} options={listLevel} isMandatoryField={true} formControlName="level" typeField="custom_select" />
                    </div>
                    <div>
                        <ListUploadedDegrees degrees={degrees} download={(fileId) => this.doDownload(fileId)} delete={(fileId) => this.doDeleteUploadedFile(fileId)}/>
                    </div>
                    <div>
                        <div className={styles.dropzoneEduContainer}>
                            <FormField formGroupId="degreesId" formLabel={this.context.t("account.tutot.edu.degree.title")} onUpload={this.doUploadFile.bind(this)} isMandatoryField={false} formControlName="degrees" typeField="upload_file" />
                            <div className="d-flex flex-vertical ml-15 mr-15">
                                {uploadFiles.map(file => this.renderPreviewFile(file))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <FormField formGroupId="skillsId" formLabel={this.context.t("account_tutor_skill_title")} options={skillSet} selectedValues={skills} formControlName="skills" typeField="multi_select"/>
                    </div>
                    <div>
                        <FormField formGroupId="certificatesId" formLabel={this.context.t("account_tutor_certificate_title")} options={certificateSet} selectedValues={certificates} formControlName="certificates" typeField="multi_select"/>
                    </div>

                    <div>
                        <FormField formGroupId="schoolId" formLabel={this.context.t("account_tutor_school_title")} formControlName="school" typeField="custom_input"/>
                    </div>

                    <div>
                        <button type="submit" className="ml-15 mr-15 mt-15 btn-link-dark">{this.context.t("account_tutor_save_btn")}</button>
                    </div>
                </form>
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
    const { loadEducationData, addNewDocumentFile } = state;
    const { skills, certificates, degrees, listLevel, skillSet, certificateSet } = loadEducationData;
    const { uploadFiles } = addNewDocumentFile;
    return {
        skills,
        certificates,
        degrees,
        listLevel,
        uploadFiles,
        skillSet, certificateSet
    }
};

export default connect(mapStateToProps)( reduxForm({
    form: 'tutorEducation',
    fields: ['level'],
    onSubmit: updateTutorEducation()
})(cssModules(TutorEducation, styles)));

