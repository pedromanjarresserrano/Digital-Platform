import React from 'react';
import Input from '../input/Input';
import Axios from 'axios';



toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataForm: this.props.formField,
            formIsValid: false,
            loading: false
        };
    }

    componentWillMount() {
        var user = localStorage.getItem("userInfo");
        if (!user) {
            this.props.history.push('/admin/login');

        }
    }

    componentDidMount() {
        if (this.props.match.params.action === "edit") {
            Axios.get(this.props.baseUrl + '/' + this.props.match.params.id).then(response => {
                const { dataForm } = this.state;
                for (let formElementIdentifier in dataForm) {
                    dataForm[formElementIdentifier].value = response.data[formElementIdentifier];
                    dataForm[formElementIdentifier].valid = true;
                    if (dataForm[formElementIdentifier].elementType === 'select-model') {
                        if (dataForm[formElementIdentifier].optConfig.multiple) {
                            dataForm[formElementIdentifier].value = response.data[formElementIdentifier].map(item => item._id);
                        } else {
                            dataForm[formElementIdentifier].value = response.data[formElementIdentifier]._id;
                            const newLocal = response.data[formElementIdentifier][dataForm[formElementIdentifier].labelField];
                            dataForm[formElementIdentifier].uiValue = { value: response.data[formElementIdentifier]._id, label: newLocal }
                        }
                    }
                }
                this.setState({ dataForm, formIsValid: true });
            }).catch(err => {
                alert(JSON.stringify(err));
            })
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    addOrRemove = (array, value) => {
        var index = array.indexOf(value);

        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }

    inputChangedHandler = (event, inputIdentifier, elementType) => {
        const updateddataForm = {
            ...this.state.dataForm
        };
        const updatedFormElement = {
            ...updateddataForm[inputIdentifier]
        };
        if (updatedFormElement.optConfig && updatedFormElement.optConfig.multiple) {
            updatedFormElement.value = event.target.value;

            //this.addOrRemove(updatedFormElement.value, event.target.value);
        } else
            if (event.target.type == 'file')
                updatedFormElement.value = event.target.files[0];
            else
                updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateddataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateddataForm) {
            formIsValid = updateddataForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ dataForm: updateddataForm, formIsValid: formIsValid });
    }
    haveFile() {
        for (let formElementIdentifier in this.state.dataForm) {
            if (this.state.dataForm[formElementIdentifier].value instanceof File) {
                return true
            }

        }
    }

    formHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let headers = {}
        let data = new FormData();
        let bool = this.haveFile();
        headers["Content-Type"] = 'application/json';
        headers["x-access-token"] = '' + localStorage.getItem("utoken");
        ;
        if (bool) {
            for (let formElementIdentifier in this.state.dataForm) {
                if (this.state.dataForm[formElementIdentifier].value instanceof File) {
                    data.append(formElementIdentifier, this.state.dataForm[formElementIdentifier].value, formElementIdentifier);
                    headers["Content-Type"] = 'multipart/form-data';
                } else {
                    data.append(formElementIdentifier, this.state.dataForm[formElementIdentifier].value);
                }
            }
        } else {
            data = {};
            for (let formElementIdentifier in this.state.dataForm) {
                data[formElementIdentifier] = this.state.dataForm[formElementIdentifier].value;
            }
        }
        console.log(data);

        Axios.post(this.props.baseUrl, data, {
            headers: headers
        })
            .then(response => {
                //this.setState({ loading: false });
                //this.props.history.push('/');
                toastr["success"]("Saved")

                this.cancelClick();
            })
            .catch(error => {
                toastr["error"]("Error on save")
                console.log(error);

                //this.setState({ loading: false });
            });
    }

    cancelClick = (event) => {
        this.props.history.go(-1);

    }

    mapToInput(formElement) {
        return (<Input
            keyId={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            inline={formElement.config.inline}
            label={formElement.config.label}
            apiUrlModel={formElement.config.apiUrlModel}
            optConfig={formElement.config.optConfig}
            changed={(event) => this.inputChangedHandler(event, formElement.id, formElement.config.elementType)} />);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.dataForm) {
            formElementsArray.push({
                id: key,
                config: this.state.dataForm[key]
            });
        }

        let form = (
            <form onSubmit={this.formHandler}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            {formElementsArray.filter(e => e.config.elementType == 'file-image').map(formElement => this.mapToInput(formElement))}
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-9">
                            {formElementsArray.filter(e => e.config.elementType != 'file-image').map(formElement => this.mapToInput(formElement))}
                        </div>

                    </div>

                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-danger mr-1" onClick={this.cancelClick}>Cancel</button>
                    <button type="submit" className="btn btn-success" >Save</button>
                </div>
            </form>
        );

        return (
            <div className="container-fluid">
                <div className="card card-default">
                    <div className="card-header">
                        <h4 className="card-title" >{this.props.formTitle}</h4>


                    </div>
                    {form}
                </div>
            </div>
        );
    }


}

export default Form;