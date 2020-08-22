import React from 'react';
import CategoriesHome from '../categories/CategoriesHome';
import Axios from 'axios';
import ActorsHome from '../actors/ActorsHome';

class Home extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            items: [],
            actors: []
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

        Axios.get('/api/dashboard/actors')
            .then(response => {
                console.log(response);
                this.setState({
                    actors: response.data.result
                });
            });
    }


    render() {
        return (
            <div>
                {
                    this.state.items.map((item) => <CategoriesHome key={Math.random()} item={item} />)
                }
                <ActorsHome items={this.state.actors} />
            </div>
        );
    }
}

export default Home;
