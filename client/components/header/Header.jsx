import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <a className="navbar-brand" href="#">VideoJS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-lg-flex flex-lg-row-reverse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
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
