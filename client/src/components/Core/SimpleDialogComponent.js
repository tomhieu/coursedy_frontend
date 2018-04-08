import {Component} from "react";
import * as React from "react";
import Modal from "react-bootstrap4-modal";

class SimpleDialogComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const {show, title, acceptCallback, acceptLabel = "OK", cancelCallback, cancelLabel = "Cancel"} = this.props;
      return (
        <Modal visible={show} onClickBackdrop={cancelCallback}>
          <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={acceptCallback}>
              {acceptLabel}
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancelCallback}>
              {cancelLabel}
            </button>
          </div>
        </Modal>
      )
    }
}

SimpleDialogComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
};

SimpleDialogComponent.propTypes = {
    show: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    cancelCallback: React.PropTypes.func.isRequired,
    acceptLabel: React.PropTypes.string,
    cancelLabel: React.PropTypes.string,
    acceptCallback: React.PropTypes.func,
}

export default SimpleDialogComponent;