
import ReactDOM from 'react-dom';
import React from 'react';
import ModalAdd from './ModalAdd';


export const ShowAddModal = (urlData, urlPost, data, title, multiple = true) => {

    ReactDOM.render(<ModalAdd urlData={urlData} urlPost={urlPost} data={data} title={title} multiple={multiple} />, document.getElementById('modalcontainer'));

}

