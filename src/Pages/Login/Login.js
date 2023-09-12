import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Login() {
    // const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState();
    const [password , setpassword] = useState();


  return (
<body class="login-bg">
<div class="page-wrapper">
        <div class="wrapper wrapper-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="type-wrap">
                            <div id="typed-strings">
                                <p>Human Resources</p>
                            </div>
                            <span id="typed" ></span>
                        </div>
                    </div>
                   
                    <div class="col-lg-6 login-box">
                        <div class="ibox bg-boxshadow mb-50">
                            <img src="/img/logo.png" class="img-fluid logo" />
                            <div class="ibox-title basic-form mb-30 bg-transparent">
                                <h5>Sign In Here</h5>
                            </div>
                            <div class="ibox-content">
                                {
                                <form action="#">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Login Id</label>
                                        <div class="col-lg-9">
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                class="form-control"
                                            />
                                                
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Password</label>

                                        <div class="col-lg-9">
                                            <input type="password" placeholder="Password" class="form-control"/>

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
            </div>
        </div>
    </div>
</body>
  )
                            }
