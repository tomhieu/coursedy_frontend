import React, {Component} from "react";
import ChangePassword from "./ChangePassword";
import TutorEducation from "./TutorEducation";
import cssModules from 'react-css-modules';
import styles from './TutorAccount.module.scss';
import PersonInfoContainer from "./PersonInfo";

class TutorAccount extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-12">
                <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content ">
                    <div className="d-flex flex-vertical justify-content-center">
                        <h2 className="text-center normal-text bold">{this.context.t("account.person.info.title")}</h2>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content ">
                    <div className="d-flex flex-vertical block-content">
                        <PersonInfoContainer/>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content ">
                    <div className="d-flex flex-vertical block-content">
                        <TutorEducation/>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content ">
                    <div className="d-flex flex-vertical block-content">
                        <ChangePassword/>
                    </div>
                </div>
            </div>
        )
    }
}

TutorAccount.contextTypes = {
    t: React.PropTypes.func.isRequired
};

const styleComponent = cssModules(TutorAccount, styles);

export default styleComponent