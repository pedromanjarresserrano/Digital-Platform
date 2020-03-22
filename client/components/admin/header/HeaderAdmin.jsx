import React from 'react';
import { Link } from 'react-router-dom'

class HeaderAdmin extends React.Component {
    componentWillMount() {
        //console.log(this)
    }

    render() {
        return (
            <>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link className="nav-item nav-link " to="/admin">Home Admin</Link>      </li>

                </ul>

            </>
        );
    }


}

export default HeaderAdmin;
