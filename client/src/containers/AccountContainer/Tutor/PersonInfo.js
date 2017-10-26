import {Component} from "react";
import {PersonalInfoForm} from "../../../components/Account/Tutor/PersonalInfoForm";
import * as React from "react";
import {reduxForm} from "redux-form";
import styles from './PersonInfo.module.scss';
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import {dispatch} from "redux";
import {loadPersonInfo, savePersonData, testChangeName} from "../../../actions/TutorAccountService";

class PersonInfoContainer extends Component {
    constructor(props) {
        super(props);
        this.savePersonInfo = this.savePersonInfo.bind(this);
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

    savePersonInfo() {
        this.props.dispatch(savePersonData());
    }

    testChangeNameAction() {
        this.props.dispatch(testChangeName());
    }

    render() {
        const {firstName, lastName, email, birthDate, address} = this.props;
        return (
            <div>
                <PersonalInfoForm onSubmit={this.savePersonInfo} testChangeNameAction={this.testChangeNameAction.bind(this)} firstName={firstName} lastName={lastName} email={email} birthDate={birthDate} address={address}/>
                <button type="button" onClick={this.testChangeNameAction.bind(this)}>Test</button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    const { loadPersonData } = state;
    const {
        firstName,
        lastName,
        email,
        address,
        birthDate
    } = loadPersonData;
    return {
        firstName,
        lastName,
        email,
        address,
        birthDate
    }
};

export default connect(mapStateToProps)( reduxForm({
    form: 'personInfo',
    fields: ['firstName', 'lastName', 'email', 'address', 'birthDate']
})(cssModules(PersonInfoContainer, styles)));
