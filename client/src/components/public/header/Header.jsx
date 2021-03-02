import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
class Header extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    handlerClick = (value) => {
        document.title = "Digital Plaform " + value;
        $('.navbar-collapse').collapse('hide');
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Digital Platform JS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-lg-flex flex-lg-row-reverse" id="navbarNavAltMarkup">
                    <div className="navbar-nav bg-dark">
                        <li class="d-inline d-lg-none">
                            <button data-toggle="collapse" data-target="#navbarNavAltMarkup" class="close float-right">&times;</button>
                        </li>
                        <Link className="nav-item nav-link " to="/home" onClick={() => this.handlerClick("")}>Home</Link>
                        <Link className="nav-item nav-link " to="/catalog" onClick={() => this.handlerClick("- Catalog")}>Catalog</Link>
                        <Link className="nav-item nav-link " to="/categories" onClick={() => this.handlerClick("- Categories")}>Categories</Link>
                        <Link className="nav-item nav-link " to="/actors" onClick={() => this.handlerClick("- Actors")}>Actors</Link>
                        <Link className="nav-item nav-link " to="/studios" onClick={() => this.handlerClick("- Studios")}>Studios</Link>

                        <Link className="nav-item nav-link " to="/books" onClick={() => this.handlerClick("- Books")}>Books</Link>
                        <Link className="nav-item nav-link " to="/imagesets" onClick={() => this.handlerClick("- Image Sets")}>Image Sets</Link>
                    </div>
                </div>
            </nav>
        );
    }


}

export default Header;
