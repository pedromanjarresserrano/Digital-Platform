import React from 'react';
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import TopMenu from '../ui/topmenu/TopMenu';
import "./HeaderAdmin.css"
const ENDPOINT = process.env.URLWS;

class HeaderAdmin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            //  progress: 0,
            // current: ""
        }

    }
    componentWillMount() {
        //console.log(this)
    }


    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("RMF", data => {
            if (data.process >= 100) {
                data.name = "";
                data.process = 0;
            }
            let noti = this.state;
            noti[data.id] = {
                progress: data.process,
                current: data.name ? data.name : "Task end"
            }
            this.setState(noti);
        });
    }
    render() {
        const keys = Object.keys(this.state);
        return (
            <>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link className="nav-item nav-link " to="/admin">Home Admin</Link>      </li>

                </ul>
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i className="far fa-bell"></i>
                            <span className="badge badge-warning navbar-badge">{keys.length}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" >
                            <span className="dropdown-item dropdown-header">{keys.length} Notifications</span>
                            {
                                keys.map((i) =>
                                    <>
                                        <div className="dropdown-divider"></div>
                                        <a href="#" className="dropdown-item d-flex flex-row justify-content-between">
                                            <i className="fas fa-tasks mr-2"></i><span className="text-truncate w-75"> <small>{this.state[i].current}</small></span>
                                            <span className="float-right text-muted text-sm">{this.state[i].progress}%</span>
                                        </a>
                                    </>
                                )
                            }

                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                </ul>

                <TopMenu />

            </>
        );
    }


}

export default HeaderAdmin;
