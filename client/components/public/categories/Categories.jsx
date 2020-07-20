import React from 'react';
import axios from 'axios';
import Paginator from '../../admin/ui/paginator/Paginator';
import Categorie from '../categorie/Categorie';

class Categories extends React.Component {

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
            pathname: '/categories/categorie',
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
        axios.get('/api/categorias/all/' + page)
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
                                        <Categorie item={item} vermasonclick={this.vermas} />
                                    </div>
                                );
                            }, this)
                        }
                        </div>
                    </div>
                    <Paginator totalRecords={itemCount} pageLimit={pageSize} pageNeighbours={3} onPageChanged={this.onPageChanged} />

                </div>
            </div>
        );
    }
}

export default Categories;