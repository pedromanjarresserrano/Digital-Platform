
import { ShowAddModal, ShowInputTextModal } from '../../ui/modal/Funtions';
import { fixFull } from '../../movies/MoviesFunctions';
import Axios from 'axios';

export const TopActions = [
    {
        name: "Add Categories",
        className: "btn btn-sm btn-info",
        icon: 'fas fa-plus-square',
        onClick: async function (data) {
            ShowAddModal('/api/categorias/all/-1', '/api/movies/addcatgs', data, "Add Categories");
            console.log(data);
        }
    }, {
        name: "Add Actors",
        className: "btn btn-sm btn-warning ",
        icon: 'fas fa-plus-square',
        onClick: async function (data) {
            ShowAddModal('/api/actores/all/-1', '/api/movies/addacts', data, "Add Actors");
        }
    }, {
        name: "Set Studio",
        className: "btn btn-sm text-light bg-secondary border border-dark",
        icon: 'fas fa-plus-square',
        onClick: async function (data) {
            ShowAddModal('/api/studios/all/-1', '/api/movies/addsts', data, "Studio", false);
        }
    }, {
        name: "Chk Page",
        className: "btn btn-sm btn-dark",
        icon: 'fas fa-check-square',
        onClick: async function (data) {
            Array.from(document.getElementsByClassName('checkboxcrud')).forEach(e => {
                e.checked = !e.checked;
            })
        }
    }, {
        name: "F del",
        className: "btn btn-sm btn-dark",
        icon: 'fas fa-check-square',
        onClick: async function (data) {
            let headers = {}
            headers["x-access-token"] = '' + localStorage.getItem("utoken");
            data.items.forEach(i => {
                Axios
                    .delete('/api/movies/' + i,
                        { headers }
                    )
                    .then(res => {
                        this.loadPage(1);
                        this.setState({
                            modal: false
                        })

                        toastr["success"]("Delete")

                    })
            })
        }
    }, {
        name: "Full fixes",
        className: "btn btn-sm btn-success",
        icon: 'fas fa-check-square',
        onClick: async function (data) {
            fixFull()
        }
    }
]

export const TableActions = [
    {
        name: "Rename",
        className: "btn btn-sm btn-warning",
        onClick: function (data) {
            ShowInputTextModal("/api/movies/renamefile/" + data._id, "New name");

        }
    },
    {
        name: "Delete File",
        className: "btn btn-sm bg-dark",
        onClick: async function (data, crudview) {
            let headers = {}
            headers["x-access-token"] = localStorage.getItem("utoken");
            await crudview.setState({
                modal: true,
                onOkClick: async () => {
                    await Axios
                        .delete('/api/movies/deletewithfile/' + data._id,
                            { headers }
                        )
                        .then(res => {
                            crudview.loadPage(crudview.state.activePage);
                            crudview.setState({
                                modal: false
                            })

                            toastr["success"]("Delete")
                            Array.from(document.getElementsByClassName('checkboxcrud')).forEach(e => {
                                e.checked = false;
                            })
                        }).catch(err => {
                            crudview.setState({
                                modal: false
                            })
                            toastr["warning"]("Error on delete")
                            Array.from(document.getElementsByClassName('checkboxcrud')).forEach(e => {
                                e.checked = false;
                            })
                        })
                }
                ,
                onClose: () =>
                    crudview.setState({
                        modal: false
                    })

            });
        }
    }
]