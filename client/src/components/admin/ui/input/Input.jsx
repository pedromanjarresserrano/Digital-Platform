import React from 'react';
import Axios from 'axios';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

class Input extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
            selectValue: {},
            opts: [],
            items: []
        };

    }
    componentDidMount() {
        if (this.props.apiUrlModel)
            Axios.get(this.props.apiUrlModel)
                .then(function (response) {
                    const items = response.data;
                    if (items) {
                        this.setState({
                            items: items
                        });
                        var options = items.map(function (item) {
                            return (
                                <MenuItem key={item._id} value={item._id}>
                                    <ListItemText primary={item.name} />
                                </MenuItem>
                            );
                        }, this);
                        this.setState({
                            opts: options
                        });
                    }
                }.bind(this));
    }

    getInput() {
        switch (this.props.elementType) {
            case ('input'):
                return (<input
                    className="form-field"
                    name={this.props.keyId}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    required={this.props.validation ? this.props.validation.required : false}
                    onChange={this.props.changed} />);

            case ('textarea'):
                return (<textarea
                    className="form-field"
                    name={this.props.keyId}
                    {...this.props.elementConfig}
                    value={this.props.value}
                    onChange={this.props.changed} />);

            case ('select'):
                const { data } = this.state;
                return (
                    <select
                        className={(this.props.optConfig.multiple ? '' : "form-field") + 'select-field'}
                        name={this.props.keyId}
                        value={this.props.value}
                        onChange={this.props.changed}
                        {...this.props.optConfig}
                        required
                    >
                        {
                            data.map(option => (
                                <option key={option._id} value={option._id}>
                                    {option.name}
                                </option>
                            ))
                        }
                    </select>
                );
            case ('select-model'):
                return (
                    <Select
                        className={(this.props.optConfig.multiple ? '' : "form-field") + 'select-field'}
                        name={this.props.keyId}
                        value={this.props.value}
                        onChange={this.props.changed}
                        renderValue={selected => {
                            if (!this.props.optConfig.multiple)
                                return this.props.value;
                            else
                                return (
                                    <div className={'chips'}>
                                        {
                                            this.props.value.map(value => (
                                                <Chip key={value} label={this.state.items.find(x => x._id === value).name} className={'chip'} />
                                            ))
                                        }
                                    </div>
                                );
                        }}

                        {...this.props.optConfig}
                    >
                        {this.state.opts}
                    </Select>
                );
            case ('file-image'):
                return (
                    <div className="w-100">
                        <img className="img-fluid" src={this.props.value instanceof File ? URL.createObjectURL(this.props.value) : this.props.value} {...this.props.elementConfig} />
                        <div className="input-group mb-3 mt-3" >
                            <div className="custom-file">
                                <input type="file" id={"file-" + this.props.keyId} name={this.props.keyId} className="custom-file-input" onChange={this.props.changed} />
                                <label htmlFor={"file-" + this.props.keyId} className="custom-file-label">Upload File</label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (<input
                    className="form-field"
                    {...this.props.elementConfig}
                    value={this.props.value}
                    name={this.props.keyId}
                    onChange={this.props.changed} />);
        }
    }

    getField() {
        if (this.props.inline) {
            return (
                <div className="row">
                    <div className="col-sm-12 col-md-3 label-field">
                        <label className=" label-field  ">{this.props.label}</label>
                    </div>
                    <div className="col-sm-12 col-md-9">
                        {this.getInput()}
                    </div>
                </div>
            );
        } else {
            return (
                <div >
                    <label >{this.props.label}
                        {this.getInput()}
                    </label>
                </div>
            );
        }
    }

    render() {
        return (
            this.getField()
        );
    }


}
export default Input;