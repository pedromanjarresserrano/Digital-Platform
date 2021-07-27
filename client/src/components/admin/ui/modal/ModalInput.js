import axios from 'axios';
import React from "react";
import Modal from './Modal';


export default class ModalInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.inputRef = React.createRef();
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value,
            currentCursor: event.target.selectionStart
        },
            () => {
                this.inputRef.current.selectionStart = this.state.currentCursor;
                this.inputRef.current.selectionEnd = this.state.currentCursor;
            });
    }


    render() {
        return (

            <Modal key={'rds-' + Math.random()} show="true" okLabel="Save"

                title={this.props.title}

                onOkClick={event => {
                    axios.post(this.props.urlPost, {
                        name: this.state.value
                    }, {
                        headers: {
                            "Content-Type": 'application/json',
                            "x-access-token": localStorage.getItem("utoken")
                        }
                    })
                        .then((res => {
                            toastr["success"]("Send");
                            close();
                        }).bind(this))
                        .catch(error => {
                            toastr["error"]("Error on Send");
                            console.log(error);
                        });
                }

                }


                style={
                    {
                        buttonOk: "btn btn-primary",
                        buttonCancel: "btn btn-danger"
                    }
                }
            >
                <form >
                    <label>
                        Name:
                        <input
                            ref={this.inputRef}
                            type="text" autoFocus='true'
                            value={this.state.value}
                            selectionStart={this.cursor}
                            selectionEnd={this.cursor}
                            onChange={this.handleChange}
                        />
                    </label>

                </form>
            </Modal>
        );
    }

}