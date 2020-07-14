import React from 'react';
import './Modal.css';


class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        };

        this.close = this.close.bind(this);
    }

    close = () => {
        this.props.onClose();
    }

    render() {
        return (<div class={(this.state.show ? "show d-block " : "") + "modal fade "} id="modal-default" aria-modal="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{this.props.title}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {this.props.content}
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class={this.props.style && this.props.style.buttonCancel ? this.props.style.buttonCancel : "btn btn-default"} data-dismiss="modal" onClick={this.close}>Close</button>
                        <button type="button" class={this.props.style && this.props.style.buttonOk ? this.props.style.buttonOk : "btn btn-primary"} onClick={this.props.onOkClick}>{this.props.okLabel}</button>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default Modal;