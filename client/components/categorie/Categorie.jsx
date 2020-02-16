import React from 'react';
import { Link } from 'react-router-dom'

class Categorie extends React.Component {

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <Link to={{
                pathname: "/categories/categorie/" + this.props.item.name,
                state: { item: this.props.item }
            }}>
                <div className="p-1" >
                    {
                        <img src={this.props.item.image} />
                    }
                    <p className="text-white text-center">{this.props.item.name}</p>
                </div>
            </Link>
        );
    }


}
export default Categorie;