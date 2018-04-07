import {Component} from "react";
import {submit} from 'redux-form';
import * as React from "react";
import {connect} from "react-redux";
import Modal from "react-bootstrap4-modal";

class FormDialogContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { formName, show, title, cancelCallback,
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
          <button type="button" className="btn btn-secondary" onClick={cancelCallback}>
            {okLabel}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => this.props.dispatch(submit(formName))}>
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