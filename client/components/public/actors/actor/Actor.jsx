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
                <div className="p-1" >
                    {
                        <img className="img-fluid" src={this.props.item.imageAvatar} />
                    }
                    <p className="text-white text-center">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Actor;