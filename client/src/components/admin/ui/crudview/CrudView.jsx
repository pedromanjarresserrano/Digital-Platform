import React from 'react';
import Table from '../table/Table';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Modal from '../modal/Modal';
import './CrudView.css';
import { CommonLoading } from 'react-loadingg';
import queryString from 'query-string'
import { generatePath } from 'react-router-dom';
import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';

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
            sortby: this.props.sortByDefault ? this.props.sortByDefault.sortby : this.getParams().sortby ? this.getParams().sortby : '',
            direction: this.props.sortByDefault ? this.props.sortByDefault.sortdir : this.getParams().direction ? this.getParams().direction : '1',
            loading: true,
            chunk: this.props.chunk ? this.props.chunk : this.getParams().chunk ? this.getParams().chunk : 25,
            anchorEl: false,
            open: false
        }


        this.getToolBar = this.getToolBar.bind(this);
        this.deleteClick = this.deleteClick.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        //   document.body.classList.add('overflow-body');
        window.onresize = (event) => {
            const table = document.getElementsByClassName('crud-table-fixed')[0];
            //   table.style.height = parseInt(window.innerHeight * 0.83) + 'px'
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('overflow-body');
    }

    componentDidMount() {
        this.loadPage(this.state.activePage);
        //   document.getElementsByClassName('crud-table-fixed')[0].style.height = parseInt(window.innerHeight * 0.83) + 'px'
    }

    getCurrentPage() {
        let page = this.props.match.params.page;
        return page ? parseInt(page) : 1;
    }

    getParams() {
        return queryString.parse(this.props.location.search);
    }

    async componentWillMount() {
        var user = localStorage.getItem("userInfo");
        if (!user) {
            this.props.history.push('/admin/login');
        }
        const values = this.getParams();

        let page = this.getCurrentPage();

        var statesVal = { activePage: page }
        if (values && values.search) {
            statesVal.search = values.search;
        }

        await this.setState(statesVal);

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
                        this.loadPage(this.state.activePage);
                        this.setState({
                            modal: false
                        })

                        toastr["success"]("Delete")

                    }).catch(err => {
                        this.setState({
                            modal: false
                        })
                        toastr["warning"]("Error on delete")

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

    async loadPage(page = 1) {
        let find = {
            $or: [{
                name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' }
            }
                , {
                url: { "$regex": ".*" + this.state.search + ".*", $options: 'i' }
            }]
        }
        axios.post(this.props.baseUrl + '/all/' + page + '?chunk=' + this.state.chunk + (this.state.sortby ? '&sort=' + this.state.sortby + '&sortdir=' + this.state.direction : ''), find)
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

    loadPageArrow = (e = {}) => { this.loadPage() } 

    newClick = (item) => {
        this.props.history.push({
            pathname: this.props.baseRoute + '/new/0'
        })
    }

    handleSearch(event) {
        event.preventDefault();
        let search = this.createQueryString({ ...this.getParams(), "search": this.state.search });
        debugger

        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: 1 }),
            search: search

        })
        this.setState({ activePage: 1 })
        this.loadPage(1);

    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: this.state.activePage }),
            search: this.createQueryString({ ...this.getParams(), [event.target.id]: event.target.value }),

        })
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch(e);

        }
    }

    handleClick = (event) => {
        //setAnchorEl(event.currentTarget);
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        })
        debugger
    };
    handleClose = () => {
        // setAnchorEl(null);
        this.setState({
            anchorEl: null,
            open: false
        })
    };
    createQueryString(queryObject = {}) {
        let queryString = Object.keys(queryObject)
            .filter((key) => queryObject[key] && !(Array.isArray(queryObject[key]) && !queryObject[key].length))
            .map((key) => {
                return Array.isArray(queryObject[key]) ? queryObject[key].map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&') : `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`;
            }).join('&');
        return queryString ? `?${queryString}` : "";
    };

    getToolBar = () => {

        return (<div className="col-12 py-1 bg-secondary d-flex flex-row justify-content-between">
            <div className='d-flex flex-sm-row flex-column'>
                <Button
                    id="basic-button"
                    aria-controls={this.state.open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={this.state.open ? 'true' : undefined}
                    onClick={this.handleClick}
                    className='btn btn-sm bg-primary my-0'
                >
                    Menu
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    elevation={0}
                    onClose={this.handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {this.props.extraTopAcciones && this.props.extraTopAcciones.length > 0 ? this.props.extraTopAcciones.map(accion =>
                        <button key={Math.random() + "-id-button-crud-commands"} type="button" className={accion.className + ' w-100 mb-1 py-2'} onClick={() => accion.onClick({
                            items: Array.from(document.querySelectorAll('input.checkboxcrud:checked')).map(e => e.value)
                        })}><i className={accion.icon}></i> {accion.name}</button>
                    ) : ""}
                </Menu>
                <div id='normal-menu' className='d-flex flex-row'>
                    <button title="New" onClick={this.newClick} className="btn btn-sm btn-primary"><i className="fas fa-plus-square"></i></button>

                    {this.props.extraTopAcciones && this.props.extraTopAcciones.length > 0 ? this.props.extraTopAcciones.map(accion =>
                        <button key={Math.random() + "-id-button-crud-commands"} type="button" className={accion.className + ' ml-1 '} onClick={() => accion.onClick({
                            items: Array.from(document.querySelectorAll('input.checkboxcrud:checked')).map(e => e.value)
                        })}><i className={accion.icon}></i> {accion.name}</button>
                    ) : ""}
                    {
                        this.state.sortby ?
                            <div className='d-flex row-flex'>
                                <select value={this.state.sortby} id='sortby'  className='w-100'
                                onChange={this.handleChange}>
                                    <option disable value={null}>Select option</option>
                                    {this.props.sortBy.map((item) => (
                                        <option value={item.key}>{item.label}</option>
                                    ))}
                                </select>
                                <select value={this.state.direction} id='direction'  className='w-100'
                                onChange={this.handleChange}>
                                    <option selected value="1">ASC</option>
                                    <option value="-1">DESC</option>
                                </select>
                            </div>
                            : ''
                    }
                    <div className='d-flex row-flex'>
                        <div className="col-12">
                            <select value={this.state.chunk}
                                className='w-100 h-100'
                                id={'chunk'}
                                onChange={this.handleChange}>
                                <option disable value={null}>Page size</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                                <option value="100">100</option>
                                <option value="125">125</option>
                                <option value="150">150</option>
                                <option value="250">250</option>
                                <option value="350">350</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={this.handleSearch}>
                    <div className="form-inline">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm" onKeyDown={this._handleKeyDown} value={this.state.search} id='search' onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-danger" type='submit' >Buscar </button>

                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>);
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
                <div className="row mt-1 shadow-sm">
                    {this.getToolBar()}
                    <div className="table-responsive crud-table-fixed">
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
                                crudView={this}

                            />
                        }
                    </div>
                    <div className="col-12" >
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.itemCount}
                            itemsCountPerPage={this.state.pageSize}
                            pageRangeDisplayed={7}
                            onChange={this.onPageChanged} />
                    </div>
                </div>
            </div >
        );
    }

}

export default CrudView;