import React from 'react';
import { Link } from 'react-router-dom'

class Actor extends React.Component {

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <Link to={{
                pathname: "/actors/actor/" + this.props.item.name,
                state: { item: this.props.item }
            }}>
                <div className="m-1 bg-dark rounded" >
                    {
                        <img className="img-fluid rounded-top" src={this.props.item.imageAvatar} />
                    }
                    <p className="text-white text-center py-1">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Actor;