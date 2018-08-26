import { Component } from 'react';
import * as React from 'react';
import Modal from 'react-bootstrap4-modal';
import PrimaryButton from './PrimaryButton/PrimaryButton';

class SimpleDialogComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      show, title, acceptCallback, cancelCallback,
      acceptLabel = this.context.t('ok'),
      cancelLabel = this.context.t('cancel'),
      customClass
    } = this.props;
    return (
      <Modal visible={show} onClickBackdrop={cancelCallback} className={customClass}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {this.props.children}
        </div>
        <div className="modal-footer">
          {
            acceptCallback && acceptLabel
              ? (
                <PrimaryButton
                  type="button"
                  line={false}
                  isPrimary
                  callback={acceptCallback}
                  isSmallButton
                  title={acceptLabel}
                />
              ) : null
          }
          {
            cancelCallback && cancelLabel
              ? (
                <PrimaryButton
                  type="button"
                  line
                  callback={cancelCallback}
                  isPrimary={false}
                  isSmallButton
                  title={cancelLabel}
                />
              ) : null
          }
        </div>
      </Modal>
    );
  }
}

SimpleDialogComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
};

SimpleDialogComponent.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  // cancelCallback: React.PropTypes.func.isRequired,
  acceptLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  acceptCallback: React.PropTypes.func,
  customClass: React.PropTypes.string,
};

export default SimpleDialogComponent;
