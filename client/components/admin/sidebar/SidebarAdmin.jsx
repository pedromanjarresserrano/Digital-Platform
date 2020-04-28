import React from 'react';
import { Link } from 'react-router-dom'

class SidebarAdmin extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </a>

                <div className="sidebar">

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin">
                                    <i className="nav-icon fas fa-home"></i>
                                    <p>
                                        Home Admin
                                </p>
                                </Link>
                            </li>
                            <li className="nav-item has-treeview">
                                <Link className="nav-link " to="#">
                                    <i className="nav-icon far fa-circle"></i>
                                    <p>
                                        Public
                                    <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link className="nav-item nav-link " to="/">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Home</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-item nav-link " to="/catalog">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Catalog</p>
                                        </Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-item nav-link " to="/categories">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Categories</p>
                                        </Link>

                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin/categories">
                                    <i className="nav-icon fas fa-list-ul"></i>
                                    <p>
                                        Categorias
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin/genders">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Generos
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin/actores">
                                    <i className="nav-icon fas fa-users"></i>
                                    <p>
                                        Actores
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin/movies">
                                    <i className="nav-icon fas fa-film"></i>
                                    <p>
                                        Movies
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/admin/locations">
                                    <i className="nav-icon fas fa-folder-open"></i>
                                    <p>
                                        Locations
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-header">Info</li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-circle text-danger"></i>
                                    <p className="text">Movie Platform</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-circle text-warning"></i>
                                    <p>Version 0.0.1.Beta</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="nav-icon far fa-circle text-info"></i>
                                    <p>@Pedrioko</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div >
            </aside>
        );
    }


}

export default SidebarAdmin;
