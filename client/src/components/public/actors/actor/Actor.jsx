import React from 'react';
import { Link } from 'react-router-dom'
import './Actor.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Actor extends React.Component {

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <Link className="mx-auto d-block h-100  py-2" to={{
                pathname: "/actors/actor/" + this.props.item.name,
                state: { item: this.props.item }
            }}>
                <div className="m-1 bg-dark rounded h-100 d-flex flex-column justify-content-between" >
                    <div className="h-100 d-flex flex-row justify-content-center actor ">
                        <LazyLoadImage effect="blur"
                            wrapperClassName="img-fluid rounded-top"
                            src={this.props.item.imageAvatar} />
                    </div>
                    <p className="text-white text-center">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Actor;