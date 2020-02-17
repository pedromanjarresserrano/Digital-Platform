import React from 'react';
import { Link } from 'react-router-dom'

class HeaderAdmin extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link " to="/">Home Public</Link>
                        <Link className="nav-item nav-link " to="/catalog">Catalog Public</Link>
                        <Link className="nav-item nav-link " to="/categories">Categories Public</Link>

                        <Link className="nav-item nav-link " to="/admin">Home Admin</Link>
                        <Link className="nav-item nav-link " to="/admin/genders">Generos Admin</Link>
                        <Link className="nav-item nav-link " to="/admin/categories">Categorias Admin</Link>
                        <Link className="nav-item nav-link " to="/admin/actores">Actores Admin</Link>
                        <Link className="nav-item nav-link " to="/admin/movies">Movies Admin</Link>
                    </div>
                </div>
            </nav>
        );
    }


}

export default HeaderAdmin;
