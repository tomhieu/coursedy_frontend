import * as React from "react";
import PersonInfoContainer from "../../containers/AccountContainer/Tutor/PersonInfo";
import TutorDashboardMenu from "../../components/Dashboard/TutorDashboard/TutorDashboardMenu";
import cssModules from 'react-css-modules';
import styles from './TutorAccount.module.scss';
import {Component} from "react";
import {connect} from "react-redux";
import TutorEducation from "../../containers/AccountContainer/Tutor/TutorEducation";
import ChangePassword from "../../containers/AccountContainer/Tutor/ChangePassword";

class TutorAccount extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="dashboard-section">
                <div className="container">
                    <div className="row offcanvas offcanvas-right row-margin">
                        <div className="col-xs-8 col-sm-4 sidebar-offcanvas" id="sidebar">
                            <div className="panel-group dashboard-menu" id="accordion">
                                <TutorDashboardMenu/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-8">
                            <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content ">
                                <div className="d-flex flex-vertical justify-content-center">
                                    <h2 className="text-center bold">{this.context.t("account.person.info.title")}</h2>
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
                    </div>
                </div>
            </section>
        )
    }
}

TutorAccount.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const styleComponent = cssModules(TutorAccount, styles);


export default styleComponent