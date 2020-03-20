import React from 'react';
import { Link } from 'react-router-dom'

class SidebarAdmin extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (
            <div className="sidebar">

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link className="nav-link " to="/admin">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Home Admin
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item has-treeview">
                            <Link className="nav-link " to="#">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Public
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link className="nav-item nav-link " to="/">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Home Public</p>
                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-item nav-link " to="/catalog">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Catalog Public</p>
                                    </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-item nav-link " to="/categories">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Categories Public</p>
                                    </Link>

                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/admin/categories">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Categorias
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/admin/genders">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Generos
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/admin/actores">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Actores
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/admin/movies">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Movies
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div >
        );
    }


}

export default SidebarAdmin;
