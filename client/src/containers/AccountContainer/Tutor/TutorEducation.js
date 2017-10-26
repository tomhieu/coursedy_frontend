import * as React from "react";
import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import styles from "./TutorEducation.module.scss";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import {Dropzone} from "react-dropzone";
import {addNewDocument, loadListDegreesData, loadTutorEducationData} from "../../../actions/TutorAccountService";


class TutorEducation extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(loadTutorEducationData());
        this.props.dispatch(loadListDegreesData());
    }

    componentWillReceiveProps() {
        const {uploadFiles} = this.props;
        this.props.initialize({
            uploadFiles: uploadFiles
        });
    }

    doDownload(documentId) {
        console.log('Executing download document ' + documentId);
    }

    doDelete(documentId) {
        console.log('Executing download document ' + documentId);
    }

    doUploadFile(file) {
        this.props.dispatch(addNewDocument(file));
    }

    renderPreviewFile(file) {
        return <span>{file.fileName}</span>
    }

    render() {
        const {listLevel, degrees, skills, certificates, uploadFiles} =  this.props;
        return (
            <form onSubmit={e => onSubmit(e.target.value)}>
                <div className="col-md-12 col-sm-12">
                    <FormField formGroupId="levelId" formLabel={this.context.t("account.tutot.edu.level.title")} options={listLevel} isMandatoryField={true} formControlName="level" typeField="custom_select" />
                </div>
                <ListUploadedDegrees degrees={degrees} download={this.doDownload.bind(this)} delete={this.doDelete.bind(this)}/>
                <div className={styles.dropzoneEduContainer}>
                    <FormField formGroupId="degreesId" formLabel={this.context.t("account.tutot.edu.degree.title")} onUpload={this.doUploadFile.bind(this)} isMandatoryField={false} formControlName="degrees" typeField="upload_file" />
                    <div className="d-flex flex-vertical">
                        {uploadFiles.map(file => this.renderPreviewFile(file))}
                    </div>
                </div>
                <div className="col-md-12 col-sm-12">
                    <ListSkill skills={skills}/>
                </div>
                <div className="col-md-12 col-sm-12">
                    <ListCertificates cerificates={certificates}/>
                </div>
            </form>
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
        return (
            <div></div>
        )
    }
}

function renderUploadedDegree(degree, props) {
    let previewImage = "../images/pdf-icon.png";
    if (degree.extension === "docx") {
        previewImage = "../images/docx-icon.png";
    }
    return (
        <div className="d-flex flex-horizontal mt-10">
            <div className="pdf-image-preview"></div>
            <span className="degree-filename ml-10">{degree.name}</span>
            <a className="icon-download ml-10" onClick={props.download(degree.id)} title={degree.name}></a>
            <a className="icon-delete ml-10" onClick={props.delete(degree.id)} title={degree.name}></a>
        </div>
    )
}

function ListSkill(props) {
    if (Array.isArray(props.skills)) {
        return (
            props.skills.map( skill =>
                <div className="d-flex flex-horizontal">
                    <span>{skill.name}</span>
                    <span>x</span>
                </div>
            )
        )
    } else {
        return (<div></div>)
    }

}

function ListCertificates(props) {
    if (Array.isArray(props.certificates)) {
        return (
            props.certificates.map( certificate =>
                <div className="d-flex flex-horizontal">
                    <span>{certificate.name}</span>
                    <span>x</span>
                </div>
            )
        )
    } else {
        return (<div></div>)
    }
}

TutorEducation.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { loadEducationData, addNewDocumentFile } = state;
    const { degrees, listLevel } = loadEducationData;
    const { uploadFiles } = addNewDocumentFile;
    return {
        degrees,
        listLevel,
        uploadFiles
    }
};

export default connect(mapStateToProps)( reduxForm({
    form: 'tutorEducation',
    fields: ['level']
})(cssModules(TutorEducation, styles)));

