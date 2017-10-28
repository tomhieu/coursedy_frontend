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
    }

    componentWillMount() {
        this.props.dispatch(loadPersonInfo());
    }

    savePersonInfo({firstName, lastName, email, birthDate, address}) {
        debugger
        this.props.dispatch(savePersonData(firstName, lastName, email, birthDate, address));
    }

    render() {
        return (
            <div>
                <PersonalInfoForm onSubmit={this.savePersonInfo.bind(this)} {...this.props} />
            </div>
        )
    }
};

export default connect(state => ({
    initialValues: state.loadPersonData.data
}))( reduxForm({
    form: 'personInfo',
    fields: ['firstName', 'lastName', 'email', 'address', 'birthDate']
})(cssModules(PersonInfoContainer, styles)));
