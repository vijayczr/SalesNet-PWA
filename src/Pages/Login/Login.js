import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Login/Login.css'
import { useNavigate } from "react-router-dom";
import logo2 from '../../assets/logo.png';


export default function Login() {
    const [UserId, setUserId] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        LoginForm();
    }  


    async function LoginForm(){
            let formData = {
              UserId: UserId,
              password: password,
            };
            const res = await fetch(
              "https://localhost:44388/Authentication/Login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              }
            );
            const loginData = await res.json();
            if (loginData.resCode === 200) {
                console.log(loginData.resData);
                navigate("/Dashboard", { replace: true });
            }
    }

    return (
        <div class='container-fluid logon'>
            <div class="col-lg-6 login-box">
                <div class="ibox bg-boxshadow"> 
                    <div><img src={ logo2 } class="img-fluid logo" /></div>
                    
                    <div class="ibox-title basic-form mb-30 bg-transparent ">
                        <h5>Sign In Here</h5>
                    </div>
                    <div class="ibox-content ">
                        {
                            <form onSubmit={handleSubmit} >
                                <div class="form-group row ">
                                    <label class="col-lg-3 col-form-label">Login Id</label>
                                    <div class="col-lg-9">
                                        <input 
                                            type="text" 
                                            value={UserId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            placeholder="UserId" 
                                            class="form-control" 
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label">Password</label>

                                    <div class="col-lg-9">
                                        <input 
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            class="form-control"
                                            required
                                        />
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
