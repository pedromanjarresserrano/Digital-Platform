import React from 'react';
import Slider from '../../ui/slider/Slider';
import { Link } from 'react-router-dom';

class CategoriesHome extends React.Component {


    render() {
        return (<div className="card bg-secondary rounded-0">
            <div className="card-body d-flex flex-column">
                <Link to={"/categories/categorie/" + this.props.item._id.name}><h5 className="card-title text-white">{this.props.item._id.name}</h5></Link>
                <Slider items={this.props.item.movies} />
            </div>

        </div>)
    }
}

export default CategoriesHome;