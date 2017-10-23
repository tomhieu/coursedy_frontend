import * as React from "react";
import {Component} from "react";
import FormField from "../../../components/Core/FormField";
import styles from './TutorEducation.module.scss';
import {loadListDegreesData, loadTutorEducationData} from "actions/TutorAccountService";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import cssModules from 'react-css-modules';
import {isEmpty} from "lodash/lang";
import {Dropzone} from "react-dropzone";


class TutorEducation extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(loadTutorEducationData());
        this.props.dispatch(loadListDegreesData());
    }

    componentWillReceiveProps() {
        const {firstName, lastName,email, address, birthDate} = this.props;
        this.props.initialize({
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            birthDate: birthDate
        });
    }

    render() {
        const {listLevel, degrees, skills, certificates} =  this.props;
        return (
            <form onSubmit={e => onSubmit(e.target.value)}>
                <div className="col-md-12 col-sm-12">
                    <FormField formGroupId="levelId" formLabel={this.context.t("account.tutot.edu.level.title")} options={listLevel} isMandatoryField={true} formControlName="level" typeField="custom_select" />
                </div>
                <ListUploadedDegrees degrees={degrees} />
                <div className="col-md-12 col-sm-12">
                    <div className="dropzone">
                        <Dropzone>
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
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

function ListUploadedDegrees(degrees) {
    if (Array.isArray(degrees)) {
        return (
            degrees.map(degree =>
                <div className="d-flex flex-vertical">
                    if (degree.extension === "pdf") {
                    <img border="0" src="pdf-icon.png" width="1" height="1"></img>
                } else if (degree.extension === "docx") {
                    <img border="0" src="docx-icon.png" width="1" height="1"></img>
                } else {
                    <img border="0" src="pdf-icon.png" width="1" height="1"></img>
                }
                    <span>{degree.name}</span>
                    <a onclick={this.download(degree.id)} title={degree.name}><i className="icon-download"></i></a>
                    <a onclick={this.delete(degree.id)} title={degree.name}><i className="icon-remove"></i></a>
                </div>
            )
        )
    } else {
        return (
            <div></div>
        )
    }
}

function ListSkill(skills) {
    if (Array.isArray(skills)) {
        return (
            skills.map( skill =>
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

function ListCertificates(certificates) {
    if (Array.isArray(certificates)) {
        return (
            certificates.map( certificate =>
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
    const { loadPersonData, loadEducationData } = state;
    const {
        firstName,
        lastName,
        email,
        address,
        birthDate
    } = loadPersonData;
    const { degrees, listLevel } = loadEducationData;
    return {
        firstName,
        lastName,
        email,
        address,
        birthDate,
        degrees,
        listLevel
    }
};

export default connect(mapStateToProps)( reduxForm({
    form: 'tutorEducation',
    fields: ['level']
})(cssModules(TutorEducation, styles)));

