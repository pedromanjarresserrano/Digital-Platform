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
        debugger
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateddataForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateddataForm) {
            formIsValid = updateddataForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ dataForm: updateddataForm, formIsValid: formIsValid });
    }

    formHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let data = new FormData();
        for (let formElementIdentifier in this.state.dataForm) {
            if (this.state.dataForm[formElementIdentifier].value instanceof File) {
                data.append(formElementIdentifier, this.state.dataForm[formElementIdentifier].value, formElementIdentifier);
            } else
                data.append(formElementIdentifier, this.state.dataForm[formElementIdentifier].value);
        }
        Axios.post(this.props.baseUrl, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                //this.setState({ loading: false });
                //this.props.history.push('/');
                alert("Saved")
                this.cancelClick();
            })
            .catch(error => {
                console.log(error);

                //this.setState({ loading: false });
            });
    }

    cancelClick = (event) => {
        this.props.history.goBack();
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
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        {formElementsArray.filter(e => e.config.elementType == 'file-image').map(formElement => this.mapToInput(formElement))}
                    </div>
                    <div className="col-sm-12 col-md-8">
                        {formElementsArray.filter(e => e.config.elementType != 'file-image').map(formElement => this.mapToInput(formElement))}
                    </div>
                    <div className="col-sm-12">
                        <button className="btn btn-danger" onClick={this.cancelClick}>Cancel</button>
                        <button className="btn btn-success" disabled={!this.state.formIsValid}>Save</button>
                    </div>
                </div>


            </form>
        );

        return (
            <div className="row-content">
                <div className="text-white grid-container">
                    <h4 className="text-white">{this.props.formTitle}</h4>
                    {form}
                </div>
            </div>
        );
    }


}
export default Form;