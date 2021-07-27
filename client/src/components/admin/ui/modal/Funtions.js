import ReactDOM from 'react-dom';
import React from 'react';
import ModalAdd from './ModalAdd';
import ModalInput from './ModalInput';


export const ShowAddModal = (urlData, urlPost, data, title, multiple = true) => {

    ReactDOM.render(< ModalAdd urlData={urlData}
        urlPost={urlPost}
        data={data}
        title={title}
        multiple={multiple}
    />, document.getElementById('modalcontainer'));

};

export const ShowInputTextModal = (urlPost, title) => {
    debugger
    ReactDOM.render(< ModalInput
        urlPost={urlPost}
        title={title}
    />, document.getElementById('modalcontainer'));

}