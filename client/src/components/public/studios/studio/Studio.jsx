import React from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Studio.css';
class Studio extends React.Component {

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <Link to={{
                pathname: "/studios/studio/" + this.props.item.name,
                state: { item: this.props.item }
            }}>
                <div className="p-1 d-flex flex-column justify-content-between h-100" >
                    <div className="d-flex flex-column justify-content-center h-100 studio">
                        <LazyLoadImage effect="blur"
                            wrapperClassName="img-fluid d-block mx-auto"
                            src={this.props.item.image} />
                    </div>
                    <p className="text-white text-center">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Studio;