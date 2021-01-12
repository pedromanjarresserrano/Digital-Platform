import React from 'react';
import Input from '../input/Input';
import Axios from 'axios';




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
        } else
            if (event.target.type == 'file')
                updatedFormElement.value = event.target.files[0];
            else
                updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateddataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentity in updateddataForm) {
            formIsValid = updateddataForm[inputIdentity].valid && formIsValid;
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
    captureData = () => {
        let data = new FormData();
        if (this.haveFile()) {
            for (let formElementIdentifier in this.state.dataForm) {
                if (this.state.dataForm[formElementIdentifier].value instanceof File) {
                    data.append(formElementIdentifier, this.state.dataForm[formElementIdentifier].value, formElementIdentifier);
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
        return data;
    }

    formHandler = (event) => {
        event.preventDefault();
        let data = this.captureData();
        this.sendForm(data);
        this.cancelClick();

    }

    saveAndNew = () => {
        let data = this.captureData();
        this.sendForm(data);
        document.getElementsByTagName('form')[0].reset();
        this.setState({
            dataForm: this.props.formField,
            formIsValid: false,
            loading: false
        });
    }

    async sendForm(data) {
        try {
            this.setState({ loading: true });
            let headers = {}
            headers["Content-Type"] = 'application/json';
            headers["x-access-token"] = '' + localStorage.getItem("utoken");
            if (this.haveFile())
                headers["Content-Type"] = 'multipart/form-data';

            await Axios.post(this.props.baseUrl, data, {
                headers: headers
            });
            toastr["success"]("Saved")
            this.setState({ loading: false });
        } catch (error) {
            toastr["error"]("Error on save")
            console.log(error);
            this.setState({ loading: false });
        }
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
                    <button type="submit" className="btn btn-success mr-1" >Save</button>
                    <button type="button" className="btn btn-info" onClick={this.saveAndNew} >Save and New</button>
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