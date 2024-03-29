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
                        <Col sm="6" md="6" lg="3" className="mb-15">
                          <Link to={translation('how_coursedy_works_teacher_create_course_link')}>
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="/icons/course-creation.svg" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_course_building')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_course_building_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mb-15">
                          <Link to={translation('how_coursedy_works_teacher_manage_course_link')}>
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="/icons/course-management.svg" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_course_management')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_course_management_description')}</p>
                              </div>
                            </Card>
                          </Link>
                        </Col>
                        <Col sm="6" md="6" lg="3" className="mb-15">
                          <Link to={translation('how_coursedy_works_teacher_use_bbb_link')}>
                            <Card body>
                              <div className={styles.cardWrap}>
                                <div className={styles.icon}><img src="/icons/video-stream.svg" alt="" /></div>
                                <p className={styles.reg}>{translation('coursedy_works_for_teacher_card_course_how_to_live_stream')}</p>
                                <p className={styles.small}>{translation('coursedy_works_for_teacher_card_course_how_to_live_stream_description')}</p>
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
