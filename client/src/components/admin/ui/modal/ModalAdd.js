import { Checkbox, Chip, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import Modal from './Modal';


export default function ModalAdd(props) {
    const [value, setValue] = React.useState([]);
    const [response, setResponse] = React.useState({ data: [] });

    const {
        urlData, urlPost, data, title, multiple
    } = props;

    useEffect(async () => {
        let res = await axios.get(urlData);
        setResponse({ data: res.data });
    }, []);

    let headers = {}

    headers["Content-Type"] = 'application/json';
    headers["x-access-token"] = '' + localStorage.getItem("utoken");
    return (
        <Modal key={'rds-' + Math.random()} show="true" okLabel="Add"
            content={
                <FormControl>
                    <Select
                        className={'select-field'}
                        value={value}
                        onChange={event => {
                            console.log(event.target.value);
                            setValue(event.target.value);

                        }}

                        renderValue={selected => {
                            console.log(value)

                            return (<div className={'chips'}>
                                {
                                    value.map(v => {
                                        console.log(v)
                                        return <Chip key={v} label={response.data.find(x => x._id === v).name} className={'chip'} />
                                    })
                                }
                            </div>)
                        }
                        }
                        multiple={multiple}
                    >
                        {
                            response.data.map(function (item) {
                                return (
                                    <MenuItem key={item._id} value={item._id}>
                                        <Checkbox checked={value.indexOf(item._id) > -1} />

                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                );
                            }, this)
                        }
                    </Select>
                </FormControl>
            }
            title={title}

            onOkClick={event => {
                console.log(value)
                let { items } = data;

                axios.post(urlPost, {
                    items,
                    value
                }, {
                    headers: headers
                })
                    .then((res => {
                        toastr["success"]("Saved");
                        close();
                    }).bind(this))
                    .catch(error => {
                        toastr["error"]("Error on save");
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

