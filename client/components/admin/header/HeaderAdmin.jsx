import React from 'react';
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import TopMenu from '../ui/topmenu/TopMenu';

const ENDPOINT = "http://localhost:3001";

class HeaderAdmin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            current: ""
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
            this.setState({
                progress: data.process,
                current: data.name
            })
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
                <div id="Progress" className="w-25 text-right">
                    <small> {this.state.current} - {this.state.progress} %</small>
                </div>
                <TopMenu />

            </>
        );
    }


}

export default HeaderAdmin;
