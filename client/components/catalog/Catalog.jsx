import React from 'react';
import Movie from '../movie/Movie'
import axios from 'axios';
import { generatePath } from "react-router";
import CheckBox from '../ui/Checkbox';
import './Catalog.css';
import Pagination from "react-js-pagination";


class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialItems: [],
            items: [],
            itemCount: 0,
            pageSize: 0,
            categorias: [],
            activePage: 0,
            search: '',
            timerange: [0, 5000]
        }
        this.handleChange = this.handleChange.bind(this);

    }
    filtrarLista = (event) => {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ items: updatedList });
    }

    handleChange(event) {
        this.setState({ search: event.target.value });
    }

    vermas = (item) => {
        this.props.history.push({
            pathname: '/catalog/movie',
            state: {
                item: item
            }
        })
    }

    componentWillMount() {
        let page = this.props.match.params.page;

        page = page ? page : 1;
        this.setState({ activePage: page });
        this.loadPage(page);

        this.loadCate();
    }

    onPageChanged = pageNumber => {

        this.setState({ activePage: pageNumber });
        this.loadPage(pageNumber);
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: pageNumber })
        });
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
            });
    }

    loadPage(page) {
        axios.post('/api/movies/all/' + page,
            {
                categorias: this.state.categorias.filter(e => e.isChecked),
                name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
                duration: this.state.timerange
            })
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data.itemsList,
                    paginator: response.data.paginator,
                    itemCount: response.data.paginator.itemCount,
                    pageSize: response.data.paginator.perPage
                });
            });
    }

    handleCheckChieldElement = (event) => {
        let categorias = this.state.categorias
        categorias.forEach(categoria => {
            if (categoria._id === event.target.value)
                categoria.isChecked = event.target.checked
        })
        this.setState({ categorias: categorias })
        this.loadPage(1);
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.loadPage(1)
        }
    }
    addRange = (e) => {
        console.log(e);
        this.setState({
            timerange: e
        });
        this.loadPage(1)

    }
    render() {

        if (this.state.pageSize === 0) return null;
        return (
            <div className="row  p-1" >
                <div className="grid-container p-1">
                    <div className="row display" >
                        <div className="col-12">
                            <div className="display align-right"  >
                                <div className="col-12 col-md-3">

                                    <div className="input-group">
                                        <input type="text" className="input-group-field" onKeyDown={this._handleKeyDown} value={this.state.search} onChange={this.handleChange} />
                                        <div className="input-group-button">
                                            <input type="button" className="button" onClick={() => this.loadPage(1)} value="Buscar" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-2">
                            <ul className="filter-checkbox-group">
                                {
                                    this.state.categorias.map((cat) => {
                                        return (<CheckBox key={cat._id} handleCheckChieldElement={this.handleCheckChieldElement} value={cat._id} label={cat.name} checked={cat.isChecked} liClassName="text-white" />)
                                    })
                                }
                            </ul>
                        </div> */}

                        <div className="col-12">
                            <Pagination
                                activePage={this.state.activePage}
                                totalItemsCount={this.state.itemCount}
                                itemsCountPerPage={this.state.pageSize}
                                pageRangeDisplayed={9}
                                onChange={this.onPageChanged} />
                            <div className="filter-list">
                                <div className="row">                                    {
                                    this.state.items.map(function (item) {
                                        return (
                                            <div className="col-sm-12 col-md-2  col-lg-1" key={item._id} >
                                                <Movie item={item} vermasonclick={this.vermas} />
                                            </div>
                                        );
                                    }, this)
                                }
                                </div>
                            </div>
                            <Pagination
                                activePage={this.state.activePage}
                                totalItemsCount={this.state.itemCount}
                                itemsCountPerPage={this.state.pageSize}
                                pageRangeDisplayed={9}
                                onChange={this.onPageChanged} />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Catalog;