import React, { useContext, useState } from 'react'
import Axios from 'axios';
import { useForm } from '../hooks/useForm';
import { types } from '../types/types';
import { AuthContext } from '../auth/AuthContext';

export const LoginAdmin = ({ history }) => {
    
    const { dispatch } = useContext(AuthContext);

    const [formValues, handleInputChange] = useForm({
        email: '',
        pass: '',
        message: ''
    });

    const { email } = formValues;
    const { pass } = formValues;
    const { message } = formValues;


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post("/api/admin/signin", { email: email, password: pass })

            if (res.status === 200) {
                const lastPath = localStorage.getItem('lastPath') || './';
                res.data.user['logged'] = true;
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                localStorage.setItem("utoken", res.data.user.token);
                dispatch({
                    type: types.login,
                    payload: res.data.user
                });

                history.replace(lastPath);
            } else {
                this.setState({ message: res.data.message });
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <form onSubmit={handleClick} >
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="/index.html"><b>Digital</b>Platform</a>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <div className="input-group mb-3">
                                <input type="email" className="form-control"
                                    name="email"
                                    value={email} onChange={handleInputChange}
                                    placeholder="Email" required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control"
                                    name="pass"
                                    value={pass} onChange={handleInputChange} placeholder="Password" required />
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
                                    <button onSubmit className="btn btn-primary btn-block">Sign In</button>
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
        </form>
    )

}
