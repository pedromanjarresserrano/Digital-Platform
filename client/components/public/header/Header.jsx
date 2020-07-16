import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    handlerClick = (value) => {
        document.title = "Movies Plaform " + value;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <a className="navbar-brand" href="#">MovieJS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-lg-flex flex-lg-row-reverse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link " to="/home" onClick={() => this.handlerClick("")}>Home</Link>
                        <Link className="nav-item nav-link " to="/catalog" onClick={() => this.handlerClick("- Catalog")}>Catalog</Link>
                        <Link className="nav-item nav-link " to="/categories" onClick={() => this.handlerClick("- Categories")}>Categories</Link>
                        <Link className="nav-item nav-link " to="/actors" onClick={() => this.handlerClick("- Actors")}>Actors</Link>
                    </div>
                </div>
            </nav>
        );
    }


}

export default Header;
