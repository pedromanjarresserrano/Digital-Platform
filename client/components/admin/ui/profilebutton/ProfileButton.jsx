

import React from 'react';
import './ProfileButton.css';
import { withRouter } from "react-router";

class ProfileButton extends React.Component {

    constructor(props) {
        super(props);

    }

    signOut = () => {
        localStorage.setItem("userInfo", null);
        this.props.history.push('/admin/login');
    }

    render() {
        return (
            <li class="nav-item dropdown user-menu ">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="/img/user2-160x160.jpg" class="user-image img-circle elevation-2" alt="User Image" />
                    <span class="d-none d-md-inline">Alexander Pierce</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right "
                    style={{ left: "inherit", right: "0px" }}>
                    <li class="user-header bg-primary">
                        <img src="/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />

                        <p>
                            Alexander Pierce - Web Developer
              <small>Member since Nov. 2012</small>
                        </p>
                    </li>
                    <li class="user-body">
                        <div class="row">
                            <div class="col-4 text-center">
                                <a href="#">Followers</a>
                            </div>
                            <div class="col-4 text-center">
                                <a href="#">Sales</a>
                            </div>
                            <div class="col-4 text-center">
                                <a href="#">Friends</a>
                            </div>
                        </div>
                    </li>
                    <li class="user-footer">
                        <a href="#" class="btn btn-default btn-flat">Profile</a>
                        <a href="#" class="btn btn-default btn-flat float-right" onClick={this.signOut}>Sign out</a>
                    </li>
                </ul>
            </li>
        );
    }
}

export default withRouter(ProfileButton);