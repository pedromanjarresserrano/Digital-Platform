import React from 'react';
import axios from 'axios';
import Movie from '../public/movies/movie/Movie';
import Pagination from 'react-js-pagination';
import { Constants } from '../public/common/Constants';

class Duplicates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                items: [],
                pagesize: 5,
                count: 0
            },
            activePage: 1,

        }
        this.deletefull = this.deletefull.bind(this);
    }
    async componentDidMount() {
        this.loadPage(this.state.activePage);

    }

    loadPage(page) {
        axios.get('/api/movies/duplicates?page=' + page)
            .then(response => {
                console.log(response);
                this.setState({
                    data: response.data
                });
            }).catch(error => { console.log(error) });
    }

    async deletefull(item) {

        let headers = {}
        headers["x-access-token"] = localStorage.getItem("utoken");

        await axios
            .delete('/api/movies/deletewithfile/' + item._id,
                { headers }
            )
            .then(res => {
                this.loadPage(1);
                this.setState({
                    modal: false
                })

                toastr["success"]("Delete")

            })

    }

    onPageChanged = pageNumber => {
        pageNumber = parseInt(pageNumber)
        this.setState({ activePage: pageNumber });
        this.loadPage(pageNumber);
    }

    render() {

        return (
            <div>
                {
                    this.state.data.items.map(item => (
                        <div className="w-100 h-100 d-flex flex-column">
                            {item._id.duration}
                            <div className=" d-flex flex-row flex-wrap"> {
                                item.idsForDuplicatedDocs.map((item, index) =>
                                    <div className=" d-flex flex-column align-items-center  ">
                                        <Movie item={item} index={index} />
                                        <button className="btn btn-danger " onClick={() => {
                                            console.log("Click");
                                            this.deletefull(item)
                                        }} >{"Delete"}</button>
                                    </div>

                                    , this)
                            }
                            </div>
                        </div>
                    ))
                }
                <Pagination
                    className="mb-2"
                    activePage={this.state.activePage}
                    totalItemsCount={this.state.data.count}
                    itemsCountPerPage={this.state.data.pagesize}
                    pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                    onChange={this.onPageChanged} />
            </div>
        );

    }
}
export default Duplicates;