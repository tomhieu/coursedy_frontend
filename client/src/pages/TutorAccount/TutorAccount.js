import * as React from "react";
import PersonInfoContainer from "../../containers/AccountContainer/Tutor/PersonInfo";
import TutorDashboardMenu from "../../components/Dashboard/TutorDashboard/TutorDashboardMenu";
import cssModules from 'react-css-modules';
import styles from './TutorAccount.module.scss';
import {Component} from "react";
import {connect} from "react-redux";

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
                        <div className="col-xs-12 col-sm-8 dashboard-content ">
                            <div className="d-flex flex-vertical">
                                <PersonInfoContainer/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


const styleComponent = cssModules(TutorAccount, styles);

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(styleComponent)