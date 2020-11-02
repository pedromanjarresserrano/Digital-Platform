import React, { Component } from 'react'
import Axios from 'axios';

export default class LoginAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleClick.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleClick() {

        Axios.post("/api/admin/signin", { email: this.state.email, password: this.state.pass })
            .then(res => {
                //this.setState({ loading: false });
                if (res.status === 200) {
                    localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                    localStorage.setItem("utoken", res.data.user.token);
                    this.props.history.push('./');
                } else {
                    this.setState({ message: res.data.message });
                }
            })
            .catch(error => {
                console.log(error);

            });

    }


    render() {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/index.html"><b>Movies</b>Platform</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <div className="input-group mb-3">
                                <input type="email" className="form-control"
                                    name="email"
                                    value={this.state.email} onChange={this.handleChange}
                                    placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control"
                                    name="pass"
                                    value={this.state.pass} onChange={this.handleChange} placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me                       </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button onClick={this.handleClick.bind(this)} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>



                            <p className="mb-1">
                                <a href="forgot-password.html">I forgot my password</a>
                            </p>
                            <p className="mb-0">
                                <a href="register.html" className="text-center">Register a new membership</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
