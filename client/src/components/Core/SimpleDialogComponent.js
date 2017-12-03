import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import * as React from "react";

class SimpleDialogComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {show, title, acceptBtn, acceptCallback, cancelCallback} = this.props;
        return (
            <Modal show={show} onHide={cancelCallback}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        acceptCallback ? <Button onClick={acceptCallback} className="btn ml-15 mr-15 mt-0 btn-primary btn-link-dark">{acceptBtn}</Button> : ''
                    }
                    <Button onClick={cancelCallback} className="btn btn-default">{this.context.t('close')}</Button>
                </Modal.Footer>
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
    acceptBtn: React.PropTypes.string.isRequired,
    cancelCallback: React.PropTypes.func.isRequired
}

export default SimpleDialogComponent;