import axios from 'axios';
import React from "react";
import Modal from './Modal';


export default class ModalInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {


        let headers = {}

        headers["Content-Type"] = 'application/json';
        headers["x-access-token"] = '' + localStorage.getItem("utoken");

        let {
            urlPost, title
        } = this.props;

        return (

            <Modal key={'rds-' + Math.random()} show="true" okLabel="Save"
                content={
                    <form >
                        <label>
                            Name:
          <input type="text" autoFocus='true' value={this.state.value} onChange={this.handleChange} />
                        </label>

                    </form>
                }
                title={title}

                onOkClick={event => {
                    axios.post(urlPost, {
                        name: this.state.value
                    }, {
                        headers: headers
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
            />
        );
    }

}