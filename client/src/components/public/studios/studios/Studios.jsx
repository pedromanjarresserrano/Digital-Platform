import React from 'react';
import axios from 'axios';
import Studio from '../studio/Studio';
import Pagination from 'react-js-pagination';

class Studios extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            initialItems: [],
            items: [],
            itemCount: 0,
            pageSize: 0
        }

    }

    filtrarLista = (event) => {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ items: updatedList });
    }

    vermas = (item) => {
        this.props.history.push({
            pathname: '/studios/studio',
            state: {
                item: item
            }
        })
    }

    componentWillMount() {
        this.loadPage(1);
    }

    onPageChanged = pageNumber => {
        pageNumber = parseInt(pageNumber)
        this.setState({ activePage: pageNumber, loading: true });
        this.loadPage(pageNumber);
        this.props.history.push({
            pathname: generatePath(this.props.match.path, { name: this.state.item.name, page: pageNumber })
        });
    }


    loadPage(page) {
        axios.get('/api/studios/all/' + page)
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


    render() {
        const { pageSize, itemCount } = this.state;

        if (pageSize === 0) return null;
        return (
            <div className=" p-1" >
                <div className="col-12">
                    <div className="filter-list">
                        <div className="display d-flex flex-row  flex-warp px-5 row" >                            {
                            this.state.items.map(function (item) {
                                return (
                                    <div className="w-100 w-m-20" key={item._id} >
                                        <Studio item={item} />
                                    </div>
                                );
                            }, this)
                        }
                        </div>
                    </div>
                    <Pagination
                        totalItemsCount={itemCount}
                        itemsCountPerPage={pageSize}
                        activePage={this.state.activePage}
                        pageRangeDisplayed={9}
                        onChange={this.onPageChanged} />

                </div>
            </div>
        );
    }
}

export default Studios;