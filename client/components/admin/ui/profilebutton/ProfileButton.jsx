

import React from 'react';
import './ProfileButton.css';
import { withRouter } from "react-router";
const months = ["Jan", "Fer", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Ded"];


class ProfileButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.getSince = this.getSince.bind(this);
    }

    componentDidMount() {

        var user = localStorage.getItem("userInfo");
        if (user || user != "null") {
            this.setState({
                user: JSON.parse(user)
            });

        }

    }
    getSince = (date) => {
        try {
            date = new Date(date)
            return months[date.getMonth()] + " - " + date.getFullYear();
        } catch (error) {
            console.log(error)
            return "Err";
        }
    }

    signOut = () => {
        localStorage.setItem("userInfo", null);
        this.props.history.push('/admin/login');
    }

    render() {
        return (
            <li className="nav-item dropdown user-menu ">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="/img/user2-160x160.jpg" className="user-image img-circle elevation-2" alt="User Image" />
                    <span className="d-none d-md-inline">{this.state ? this.state.user.name : ""}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right "
                    style={{ left: "inherit", right: "0px" }}>
                    <li className="user-header bg-primary">
                        <img src="/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />

                        <p>
                            {this.state ? this.state.user.name : ""} - Web Developer
        <small>Member since {this.getSince(this.state ? this.state.user.created : "")}</small>
                        </p>
                    </li>
                    <li className="user-body">
                        <div className="row">
                            <div className="col-4 text-center">
                                <a href="#">Followers</a>
                            </div>
                            <div className="col-4 text-center">
                                <a href="#">Sales</a>
                            </div>
                            <div className="col-4 text-center">
                                <a href="#">Friends</a>
                            </div>
                        </div>
                    </li>
                    <li className="user-footer">
                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                        <a href="#" className="btn btn-default btn-flat float-right" onClick={this.signOut}>Sign out</a>
                    </li>
                </ul>
            </li>
        );
    }
}

export default withRouter(ProfileButton);