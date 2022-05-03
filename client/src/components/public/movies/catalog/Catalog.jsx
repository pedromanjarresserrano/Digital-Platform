import React from 'react';
import Movie from '../movie/Movie'
import axios from 'axios';
import { generatePath } from "react-router";
import './Catalog.css';
import Pagination from "react-js-pagination";
import { RotateCircleLoading } from 'react-loadingg';
import queryString from 'query-string'
import { Constants } from '../../common/Constants';

class Catalog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            itemCount: 0,
            pageSize: 0,
            categorias: [],
            activePage: 1,
            search: '',
            timerange: [0, 5000],
            loading: true,
            navbar_height: 0,
            chunk: 30
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.load = this.load.bind(this);

    }

    handleChange(event) {
        this.setState({ search: event.target.value });

    }

    load = async () => {

        const values = queryString.parse(this.props.location.search);

        let page = this.props.match.params.page;

        page = page ? parseInt(page) : 1;

        var statesVal = { activePage: page }
        if (values && values.search)
            statesVal.search = values.search;

        await this.setState(statesVal);
        this.loadCate();
        this.loadPage(page);
        document.title = "Digital Plaform - Page " + page

    }

    async componentDidMount() {
        this.load();
        document.body.style.paddingTop = '0';
    }

    async componentDidUpdate() {
        window.onpopstate = () => {
            this.load();
        }
    }

    onPageChanged = pageNumber => {
        pageNumber = parseInt(pageNumber)
        this.setState({ activePage: pageNumber, loading: true });
        this.loadPage(pageNumber);
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: pageNumber }),
            search: this.props.location.search ? this.props.location.search : "",

        });
        document.title = "Digital Plaform - Page " + pageNumber

    }

    loadCate() {
        axios.get('/api/categorias/all/-1')
            .then(response => {
                console.log(response);
                this.setState({
                    categorias: response.data.map(e => {
                        e.isChecked = false;
                        return e;
                    })
                });
            }).catch(error => { console.log(error) });
    }
    playlist = () => {
        let find = {
            $and: [
                {
                    $or: [
                        {
                            name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                        {
                            visualname: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                    ]
                },
                {

                }
            ]
        }
        let cats = this.state.categorias.filter(e => e.isChecked);
        if (cats.length > 0)
            find.$and[1].categorias = cats.map(e => e._id);
        localStorage.setItem("fils", JSON.stringify(find));
        this.props.history.push({
            pathname: '/playlist',
            state: find
        })
    }

    playlist4 = () => {
        let find = {
            $and: [
                {
                    $or: [
                        {
                            name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                        {
                            visualname: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                    ]
                },
                {

                }
            ]
        }
        let cats = this.state.categorias.filter(e => e.isChecked);
        if (cats.length > 0)
            find.$and[1].categorias = cats.map(e => e._id);
        localStorage.setItem("fils", JSON.stringify(find));
        this.props.history.push({
            pathname: '/playlist4',
            state: find
        })
    }

    async loadPage(page) {
        await this.setState({
            loading: true
        })
        let find = {
            $and: [
                {
                    $or: [
                        {
                            name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                        {
                            visualname: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                        },
                    ]
                },
                {

                }
            ]
        }
        let cats = this.state.categorias.filter(e => e.isChecked);
        if (cats.length > 0)
            find.$and[1].categorias = cats.map(e => e._id);

        axios.post('/api/movies/all/' + page + '?chunk=' + this.state.chunk + (this.state.sort ? "&sort=" + this.state.sort + "&sortdir=-1" : ""), find)
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



    handleCheckChieldElement = (event) => {
        let categorias = this.state.categorias
        categorias.forEach(categoria => {
            if (categoria._id === event.target.value)
                categoria.isChecked = true
            else
                categoria.isChecked = false
        })
        this.setState({ categorias: categorias })
        this.loadPage(1);
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch(e);

        }
    }
    addRange = (e) => {
        this.setState({
            timerange: e
        });
        this.loadPage(1)

    }

    handleSearch(event) {
        event.preventDefault();
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: 1 }),
            search: '?search=' + this.state.search,

        })
        this.loadPage(1);

    }

    handleSelect(event) {
        this.setState({ chunk: event.target.value });
        this.loadPage(this.state.activePage)
    }

    handleSort(event) {
        debugger
        this.setState({ sort: event.target.value });
        this.loadPage(this.state.activePage)
    }

    render() {

        if (this.state.pageSize === 0) return null;
        return (
            <div className="w-100 " >
                <div className="display" >
                    <div className="col-12  p-5 sticky-top-scroll" >
                        <div className="row mb-2">

                            <div className="col-12 col-md-4 ">
                                <div className="form-inline">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onKeyDown={this._handleKeyDown} value={this.state.search} onChange={this.handleChange} />
                                        <div className="input-group-append">
                                            <button className="btn btn-danger " onClick={this.handleSearch} >Buscar </button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-1">
                                <select value={this.state.chunk} onChange={this.handleSelect}>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                    <option value="60">60</option>
                                    <option value="100">100</option>
                                    <option value="150">150</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-1">
                                Sort
                                <select value={this.state.sort} onChange={this.handleSort}>
                                    <option value="name">Name</option>
                                    <option value="created">Create date</option>
                                    <option value="duration">Duration</option>
                                    <option value="size">Size</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-3 offset-md-3">
                                <select className="form-control w-100" onChange={this.handleCheckChieldElement}  >
                                    <option value="Disabled" >Categorie</option>
                                    {
                                        this.state.categorias.map((cat) => {
                                            return (<option key={cat._id} value={cat._id}  >{cat.name}</option>)
                                        })
                                    }
                                </select>
                                <button className="btn btn-success" onClick={this.playlist}>
                                    Play as playlist
                                </button>

                                <button className="btn btn-success" onClick={this.playlist4}>
                                    Play as playlist4
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="col-12 ">
                        <Pagination
                            className="mb-2"
                            activePage={this.state.activePage}
                            totalItemsCount={this.state.itemCount}
                            itemsCountPerPage={this.state.pageSize}
                            pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                            onChange={this.onPageChanged} />
                        <div className="filter-list">
                            {
                                (this.state.loading) ?
                                    <div className="m-5 pb-5">
                                        <RotateCircleLoading size="large" />
                                    </div>
                                    :
                                    <div className="d-flex justify-content-between flex-row flex-wrap p-1  w-100 mx-auto mw-1500">
                                        {

                                            this.state.items.map((item, index) =>
                                                <Movie item={item} index={index} />
                                                , this)
                                        }
                                        {
                                            (this.state.items ?
                                                ([...Array(10).keys()]
                                                ).map((item, index) => {
                                                    return (<div className="w-100 w-m-20 mw-220 pd-1px d-md-block d-none" />)
                                                })
                                                : <div />)
                                        }

                                    </div>
                            }
                        </div>
                        <div className="pt-3 mb-2">

                            <Pagination

                                activePage={this.state.activePage}
                                totalItemsCount={this.state.itemCount}
                                itemsCountPerPage={this.state.pageSize}
                                pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                                onChange={this.onPageChanged} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Catalog;