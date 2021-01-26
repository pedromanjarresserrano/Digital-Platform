import React from 'react';
import Slider from '../../ui/slider/Slider';
import { Link } from 'react-router-dom';
import Movie from '../../movie/Movie';

class CategoriesHome extends React.Component {


    render() {
        return (<div className="card bg-dark rounded-0">
            <div className="card-body d-flex flex-column">
                <Link to={"/categories/categorie/" + this.props.item._id.name}><h5 className="card-title text-white">{this.props.item._id.name}</h5></Link>
                <div className="row">
                    {this.props.item.movies.map((cm, i) => {
                        return (


                            <div key={Math.random()} className="col-12 col-sm-6 col-md-3 d-flex justify-content-center flex-row">
                                <Movie item={cm} index={i} />
                            </div>
                        )




                    }, this)
                    }
                </div>
            </div>

        </div>)
    }
}

export default CategoriesHome;