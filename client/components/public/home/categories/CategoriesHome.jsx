import React from 'react';
import Slider from '../../ui/slider/Slider';

class CategoriesHome extends React.Component {


    render() {
        return (<div className="card bg-secondary rounded-0">
            <div className="card-body">
                <h5 className="card-title">{this.props.item._id.name}</h5>
                <Slider items={this.props.item.movies} />
            </div>

        </div>)
    }
}

export default CategoriesHome;