import * as React from "react";
import {Component} from "react";
import {submit} from 'redux-form';
import {connect} from "react-redux";
import Modal from "react-bootstrap4-modal";

class FormDialogContainer extends Component {
  constructor(props) {
    super(props);
  }

  onSubmitPopup() {
    this.props.dispatch(submit(this.props.formName));
  }

  cancelPopup() {
    this.props.cancelCallback();
    this.props.reset();
  }

  render() {
    const { show, title, cancelCallback,
            cancelLabel = this.context.t('close'),
            okLabel = this.context.t('ok')
      } = this.props;

    return (
      <Modal visible={show} onClickBackdrop={cancelCallback}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {this.props.children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn accept-btn" onClick={this.onSubmitPopup.bind(this)}>
            {okLabel}
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.cancelPopup.bind(this)}>
            {cancelLabel}
          </button>
        </div>
      </Modal>
    )
  }
}

FormDialogContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

FormDialogContainer.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  cancelCallback: React.PropTypes.func.isRequired,
  okLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string
}

export default connect()(FormDialogContainer);