import {Component} from "react";
import * as React from "react";
import FormField from "../../../components/Core/FormField";

class TutorEducation extends Component {
    constructor(props) {
        super(props);
        this.downloadDegree = this.downloadDegree().bind(this);
    }

    componentWillMount() {
        this.props.dispatch(loadPersonInfo());
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

    downloadDegree = (degreeId) => {
        this.props.dispatch(downloadDegree(degreeId));
    };

    deleteDegree = (degreeId) => {
        this.props.dispatch(deleteDegree(degreeId));
    };

    render() {
        const {level, degrees, skills, certificates} =  this.props;
        return (
            <form onSubmit={e => onSubmit(e.target.value)}>
                <div className="col-md-12 col-sm-12">
                    <FormField formGroupId="emailId" formLabel={this.context.t("account.person.info.email")} options="" isMandatoryField={true} formControlName="email" typeField="custom_select" />
                </div>
                <ListUploadedDegrees />
                <div className="col-md-12 col-sm-12">
                    <FormField formGroupId="addressId" formLabel={this.context.t("account.person.info.address")} placeholder={this.context.t("account.person.info.address")} isMandatoryField={true} formControlName="address" typeField="custom_input" />
                </div>
                <div className="col-md-12 col-sm-12">
                    <button type="submit">{this.context.t("account.person.info.save.btn")}</button>
                </div>
            </form>
        )
    }

}

function ListUploadedDegrees(props) {
    const degrees = props.degrees;
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
                <a onclick={this.downloadDegree(degree.id)} title={degree.name}><i className="icon-download"></i></a>
                <a onclick={this.deleteDegree(degree.id)} title={degree.name}><i className="icon-remove"></i></a>
            </div>)
    );
}