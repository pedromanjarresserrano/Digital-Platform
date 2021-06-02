import React from 'react';
import Table from '../table/Table';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from '../modal/Modal';
import './CrudView.css';
import { CommonLoading } from 'react-loadingg';
import queryString from 'query-string'
import { generatePath } from 'react-router-dom';

class CrudView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            initialItems: [],
            items: [],
            itemCount: 0,
            pageSize: 0,
            headers: this.props.headers,
            extraAcciones: [],
            modal: false,
            onOkClick: null,
            search: '',
            loading: true
        }
        this.deleteClick = this.deleteClick.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    async componentWillMount() {
        var user = localStorage.getItem("userInfo");
        if (!user) {
            this.props.history.push('/admin/login');

        }
        const values = queryString.parse(this.props.location.search);

        let page = this.props.match.params.page;

        page = page ? parseInt(page) : 1;

        var statesVal = { activePage: page }
        if (values && values.search) {
            statesVal.search = values.search;
        }

        await this.setState(statesVal);

        this.loadPage(page);
    }

    editClick = (item) => {
        this.props.history.push({
            pathname: this.props.baseRoute + '/edit/' + item._id,
            state: {
                item: item
            }
        })
    }


    deleteClick = async (item) => {
        let headers = {}
        headers["x-access-token"] = localStorage.getItem("utoken");

        await this.setState({
            modal: true,
            onOkClick: () =>
                axios
                    .delete(this.props.baseUrl + '/' + item._id,
                        { headers }
                    )
                    .then(res => {
                        this.loadPage(1);
                        this.setState({
                            modal: false
                        })

                        toastr["success"]("Delete")

                    }),
            onClose: () =>
                this.setState({
                    modal: false
                })

        })
    }

    onPageChanged = pageNumber => {
        this.loadPage(pageNumber);
        this.setState({
            activePage: pageNumber
        })
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: pageNumber }),
            search: this.props.location.search ? this.props.location.search : "",

        });
    }

    async loadPage(page) {
        let find = {
            name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' }
        }

        axios.post(this.props.baseUrl + '/all/' + page, find)
            .then(response => {
                this.setState({
                    items: response.data.itemsList,
                    paginator: response.data.paginator,
                    itemCount: response.data.paginator.itemCount,
                    pageSize: response.data.paginator.perPage,
                    loading: false
                });
            });
    }

    newClick = (item) => {
        this.props.history.push({
            pathname: this.props.baseRoute + '/new/0'
        })
    }

    handleSearch(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: 1 }),
            search: '?search=' + this.state.search,

        })
        this.loadPage(1);

    }

    handleChange(event) {
        this.setState({ search: event.target.value });
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch(e);

        }
    }

    render() {

        return (
            <div className="container-fluid ">
                {
                    (this.state.modal) ?
                        <Modal show="true" okLabel="Delete" content="Are you sure?" title="Delete" onOkClick={this.state.onOkClick}
                            onClose={this.state.onClose}
                            style={
                                {
                                    buttonOk: "btn btn-danger",
                                    buttonCancel: "btn btn-primary"
                                }
                            }
                        />
                        : ""

                }
                <div className="row m-2 shadow-sm">
                    <div className="col-12 py-1 bg-secondary d-flex flex-row justify-content-between">
                        <div>
                            <button title="New" onClick={this.newClick} className="btn btn-sm btn-primary"><i className="fas fa-plus-square"></i></button>

                            {this.props.extraTopAcciones && this.props.extraTopAcciones.length > 0 ? this.props.extraTopAcciones.map(accion =>
                                <button key={Math.random() + "-id-button-crud-commands"} type="button" className={accion.className + ' ml-1'} onClick={() => accion.onClick({
                                    items: Array.from(document.querySelectorAll('input.checkboxcrud:checked')).map(e => e.value)
                                })}><i className={accion.icon}></i> {accion.name}</button>
                            ) : ""}
                        </div>
                        <div>
                            <form onSubmit={this.handleSearch}>
                                <div className="form-inline">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-sm" onKeyDown={this._handleKeyDown} value={this.state.search} onChange={this.handleChange} />
                                        <div className="input-group-append">
                                            <button className="btn btn-sm btn-danger" type='submit' >Buscar </button>

                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="table-responsive">
                        {(this.state.loading) ?
                            <div className="m-5 pb-5" style={{
                                display: "block",
                                position: "relative",
                                width: "90%",
                                minHeight: "800px"
                            }}>
                                <CommonLoading size="small" />
                            </div>
                            : <Table
                                headers={this.state.headers}
                                data={this.state.items}
                                editClick={this.editClick}
                                deleteClick={this.deleteClick}
                                extraAcciones={this.props.extraAcciones}

                            />
                        }
                    </div>
                    <div className="col-12" >
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.itemCount}
                            itemsCountPerPage={this.state.pageSize}
                            pageRangeDisplayed={9}
                            onChange={this.onPageChanged} />
                    </div>
                </div>
            </div >
        );
    }

}

export default CrudView;