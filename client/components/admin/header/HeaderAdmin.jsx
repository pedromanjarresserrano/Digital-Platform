import React from 'react';
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

class HeaderAdmin extends React.Component {
    componentWillMount() {
        //console.log(this)
    }
    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("RMF", data => {
            console.log(data);
        });
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
