import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link className="nav-item nav-link " to="/home">Home</Link>
                        <Link className="nav-item nav-link " to="/catalog">Catalog</Link>
                        <Link className="nav-item nav-link " to="/categories">Categories</Link>
                    </div>
                </div>
            </nav>
        );
    }


}

export default Header;
