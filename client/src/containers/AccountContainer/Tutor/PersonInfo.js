import * as React from "react";
import {Component} from "react";
import {PersonalInfoForm} from "../../../components/Account/Tutor/PersonalInfoForm";
import {reduxForm} from "redux-form";
import styles from './PersonInfo.module.scss';
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import {dispatch} from "redux";
import {loadPersonInfo, savePersonData} from "../../../actions/TutorAccountCreator";
import {validate} from '../../../validations/PersonFormValidator'

class PersonInfoContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(loadPersonInfo());
    }

    savePersonInfo({firstName, lastName, email, birthDate, address}) {
        this.props.dispatch(savePersonData(firstName, lastName, email, birthDate, address));
    }

    render() {
        return (
            <div className="col-md-12 col-sm-12">
                <div className="block-title">
                    <span className="text-uppercase bold">{this.context.t("account.person.info.title")}</span>
                </div>
                <PersonalInfoForm onSubmit={this.savePersonInfo.bind(this)} {...this.props} />
            </div>
        )
    }
};

PersonInfoContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default connect(state => ({
    initialValues: state.loadPersonData.data
}))( reduxForm({
    form: 'personInfo',
    fields: ['firstName', 'lastName', 'email', 'address', 'birthDate'],
    validate
})(cssModules(PersonInfoContainer, styles)));
