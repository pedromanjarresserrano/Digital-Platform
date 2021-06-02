import React from 'react';
import axios from 'axios';
import Movie from '../public/movies/movie/Movie';

class Duplicates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
        this.deletefull = this.deletefull.bind(this);
    }
    async componentDidMount() {
        axios.get('/api/movies/duplicates')
            .then(response => {
                console.log(response);
                this.setState({
                    list: response.data
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

    render() {

        return (
            <div>
                {
                    this.state.list.map(item => (
                        <div className="w-100 h-100 d-flex flex-column">
                            {item._id.duration}
                            <div className=" d-flex flex-row"> {
                                item.idsForDuplicatedDocs.map((item, index) =>
                                    <div className="w-100 h-100 d-flex flex-column align-items-center">
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
            </div>
        );

    }
}
export default Duplicates;