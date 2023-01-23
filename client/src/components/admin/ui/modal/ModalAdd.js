import { Checkbox, Chip, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import Modal from './Modal';


export default function ModalAdd(props) {
    let [value, setValue] = React.useState(props.multiple ? [] : '');
    let [response, setResponse] = React.useState({ data: [] });

    let {
        urlData, urlPost, data, title, multiple
    } = props;

    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(urlData);
            setResponse({ data: res.data });
        }
        fetchData();
        return () => console.log('unmounting...');

    }, [urlData, value, title, data]);

    let headers = {}

    headers["Content-Type"] = 'application/json';
    headers["x-access-token"] = '' + localStorage.getItem("utoken");
    return (
        <Modal key={'rds-' + Math.random()} show="true" okLabel="Add"
            content={
                <FormControl className='w-100'>
                    <Select
                        className={'select-field'}
                        value={value}
                        onChange={event => {
                            setValue(event.target.value);
                        }}

                        renderValue={selected => {
                            return (<div className={'chips'}>
                                {
                                    value.map ? value.map(v => {
                                        console.log(v)
                                        return <Chip key={v} label={response.data.find(x => x._id === v).name} className={'chip'} />
                                    }) : response.data.find(x => x._id === value).name
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
                                        {props.multiple ? <Checkbox checked={value.indexOf(item._id) > -1} fontSize="small" /> : ''}

                                        <ListItemText primary={item.name} fontSize="small" />
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
                        data.clear();
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

