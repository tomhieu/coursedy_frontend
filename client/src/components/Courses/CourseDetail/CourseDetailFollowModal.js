import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import {Modal, Button} from 'react-bootstrap';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailFollowModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal show={this.props.showCourseFollowModal} onHide={this.props.closeCourseFollowModal}>
        <Modal.Header>
          <Modal.Title>Follow this course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your email
          <input type="text"/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeCourseFollowModal}>{this.context.t('close')}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

CourseDetailFollowModal.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailFollowModal.propTypes = {
};

export default cssModules(CourseDetailFollowModal, styles);
