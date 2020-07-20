import React from 'react';
import CategoriesHome from '../categories/CategoriesHome';
import Axios from 'axios';

class Home extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage() {
        Axios.get('/api/dashboard/movies')
            .then(response => {
                console.log(response);
                this.setState({
                    items: response.data.result
                });
            });
    }


    render() {
        return (
            <div>
                {
                    this.state.items.map((item) => <CategoriesHome key={Math.random()} item={item} />)
                }
            </div>
        );
    }
}

export default Home;
