import React from 'react';
import axios from 'axios';
import Categorie from '../categorie/Categorie';
import Pagination from 'react-js-pagination';
import RotateCircleLoading from 'react-loadingg/lib/RotateCircleLoading';
import { generatePath } from 'react-router-dom';
import { Constants } from '../../common/Constants';

class Categories extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            initialItems: [],
            items: [],
            itemCount: 0,
            pageSize: 0,
            activePage: 1,
            loading: true
        }
        this.load = this.load.bind(this);

    }
    load = async () => {

        let page = this.props.match.params.page;

        page = page ? parseInt(page) : 1;

        var statesVal = { activePage: page }

        await this.setState(statesVal);
        this.loadPage(page);
    }

    async componentDidMount() {
        this.load();
    }

    onPageChanged = pageNumber => {
        pageNumber = parseInt(pageNumber)
        this.setState({ activePage: pageNumber, loading: true });
        this.loadPage(pageNumber);
        
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { page: pageNumber })
        });
    }


    loadPage(page) {
        axios.get('/api/categorias/all/' + page)
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data.itemsList,
                    paginator: response.data.paginator,
                    itemCount: response.data.paginator.itemCount,
                    pageSize: response.data.paginator.perPage,
                    loading: false
                });
            });
    }


    render() {
        const { pageSize, itemCount } = this.state;

        if (pageSize === 0) return null;
        return (
            <div className=" p-1" >
                <div className="col-12">
                    <Pagination
                        activePage={this.state.activePage}
                        totalItemsCount={itemCount}
                        itemsCountPerPage={pageSize}
                        pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                        onChange={this.onPageChanged} />
                    <div className="filter-list d-flex flex-row justify-content-center">
                        {
                            (this.state.loading) ?
                                <div className="m-5 pb-5">
                                    <RotateCircleLoading size="large" />
                                </div>
                                : <div className="display d-flex flex-row  flex-warp px-5 row w-100 mw-1200" >
                                    {
                                        this.state.items.map(function (item) {
                                            return (
                                                <div className="w-100 w-m-20" key={item._id} >
                                                    <Categorie item={item} />
                                                </div>
                                            );
                                        }, this)
                                    }
                                </div>
                        }
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        totalItemsCount={itemCount}
                        itemsCountPerPage={pageSize}
                        pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                        onChange={this.onPageChanged} />

                </div>
            </div>
        );
    }
}

export default Categories;