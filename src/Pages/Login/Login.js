import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Login/Login.css'
import { Modal } from 'bootstrap';
import logo from '../../assets/login-bg2.png';
import logo2 from '../../assets/logo.png';


export default function Login() {
    // const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState();
    const [password, setpassword] = useState();


    return (
        <div className='logon'>
            <div class="col-lg-6 login-box">
                <div class="ibox bg-boxshadow mb-50">
                    <div><img src={ logo2 } class="img-fluid logo" /></div>
                    
                    <div class="ibox-title basic-form mb-30 bg-transparent">
                        <h5>Sign In Here</h5>
                    </div>
                    <div class="ibox-content">
                        {
                            <form action="#">
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label">Login Id</label>
                                    <div class="col-lg-9">
                                        <input type="email" placeholder="Email" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label">Password</label>

                                    <div class="col-lg-9">
                                        <input type="password" placeholder="Password" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-lg-offset-2 col-lg-7">
                                        <div class="i-checks txt1"><a href="#"> Forgot Password !</a></div>
                                    </div>
                                    <div class="col-lg-offset-2 col-lg-5">
                                        <button class="btn rounded-0 btn-sm btn-danger btn-block" type="submit">Sign in</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
