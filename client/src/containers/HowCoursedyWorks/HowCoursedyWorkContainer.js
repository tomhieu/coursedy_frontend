import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import {
  Card, Col, Nav, NavItem, NavLink, Row,
  TabContent, TabPane
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PageContainer from '../../utils/PageContainer';
import styles from './HowCoursedyWork.module.scss';
import './HowCoursedyWork.scss';
import { getCookie, setCookie } from '../../utils/storageUtils';
import * as webConstants from '../../constants/WebConstants';

class HowCoursedyWorkContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: getCookie(webConstants.HOW_COURSE_WORK_TAB) || 1
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      setCookie(webConstants.HOW_COURSE_WORK_TAB, tab);
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const coursedyWorkForTeacher = this.context.t('coursedy_works_for_teacher');
    const coursedyWorkForStudent = this.context.t('coursedy_works_for_student');
    const { t: translation } = this.context;

    return (
      <PageContainer>
        <div className={styles.containerWrap}>
          <div className="container">
            <div className={styles.content}>
              <Nav tabs className={styles.nabTab}>
                <NavItem className={styles.nabTitle}>
                  <NavLink
                    className={this.state.activeTab === 1 ? `${styles.nabLink} ${styles.activeTab}` : styles.nabLink}
                    onClick={() => {
                      this.toggle(1);
                    }}
                  >
                    {translation('coursedy_works_student_tab')}
                  </NavLink>
                </NavItem>
                <NavItem className={styles.nabTitle}>
                  <NavLink
                    className={this.state.activeTab === 2 ? `${styles.nabLink} ${styles.activeTab}` : styles.nabLink}
                    onClick={() => { this.toggle(2); }}
                  >
                    {translation('coursedy_works_teacher_tab')}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={1}>
                  <Row>
                    <Col sm="12">
                      <center>{translation('coursedy_works_for_student_update_soon')}</center>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId={2}>
                  <Row>
                    <Col sm="12">
                      <Row>
                        <Col sm="12">
                          <h2 className={styles.light}>{translation('coursedy_works_for_teacher_select_a_topic')}</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4" className="mb-15">
                          <Link to="/how-coursedy-works/teacher-account-management">
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="//p6.zdassets.com/hc/theme_assets/1073405/200310388/i_payments.png" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_account')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_account_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                        <Col sm="4" className="mb-15">
                          <Link to="/how-coursedy-works/teacher-course-building">
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="//p6.zdassets.com/hc/theme_assets/1073405/200310388/i_payments.png" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_course_building')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_course_building_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                        <Col sm="4" className="mb-15">
                          <Link to="/how-coursedy-works/teacher-course-management">
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="//p6.zdassets.com/hc/theme_assets/1073405/200310388/i_payments.png" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_course_management')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_course_management_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                        <Col sm="4" className="mb-15">
                          <Link to="/how-coursedy-works/payment-management">
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="//p6.zdassets.com/hc/theme_assets/1073405/200310388/i_payments.png" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_payment')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_payment_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

HowCoursedyWorkContainer.propTypes = {
  match: React.PropTypes.object,
};

HowCoursedyWorkContainer.contextTypes = {
  t: React.PropTypes.func.isRequired,
};

export default cssModules(HowCoursedyWorkContainer, styles);
