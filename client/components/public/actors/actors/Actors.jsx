import React from 'react';
import axios from 'axios';
import Paginator from '../../../admin/ui/paginator/Paginator';
import Actor from '../actor/Actor';

class Actors extends React.Component {

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
            pathname: '/actors/actor',
            state: {
                item: item
            }
        })
    }

    componentWillMount() {
        this.loadPage(1);
    }

    onPageChanged = data => {
        const { currentPage } = data;
        this.loadPage(currentPage);
    }

    loadPage(page) {
        axios.get('/api/actores/all/' + page)
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
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-12">
                        <Paginator totalRecords={itemCount} pageLimit={pageSize} pageNeighbours={3} onPageChanged={this.onPageChanged} />
                        <div className="filter-list">
                            <div className="display px-5 row" >
                                {
                                    this.state.items.map(function (item) {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={item._id} >
                                                <Actor item={item} vermasonclick={this.vermas} />
                                            </div>
                                        );
                                    }, this)
                                }
                            </div>
                        </div>
                        <Paginator totalRecords={itemCount} pageLimit={pageSize} pageNeighbours={3} onPageChanged={this.onPageChanged} />

                    </div>
                </div>
            </div>
        );
    }
}

export default Actors;