import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Login/Login.css'
import { useNavigate } from "react-router-dom";
import logo2 from '../../assets/logo.png';
import UserDataContext from '../../Context/UserDataContext/UserDataContext';
import getProfileData from '../../utils/api';


export default function Login() {
    const [UserId, setUserId] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const [loginErrorMssg, SetLoginErrorMssg] = useState("");

    const {updateUserData} = useContext(UserDataContext)

    async function handleSubmit(e) {
        e.preventDefault();
        LoginForm();
    }

    async function LoginForm() {
        let formData = {
            UserId: UserId,
            password: password,
        };
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/Authentication/Login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
        );
        const loginData = await res.json();
        if (loginData.resCode === 200) {
            console.log(loginData.resData);
            localStorage.setItem("JwtToken", loginData.resData.token);
            localStorage.setItem("EmpId", loginData.resData.employeeId);
            
            getProfileData(updateUserData);
            navigate("/Dashboard", { replace: true });
        }
        else {
            SetLoginErrorMssg("Please check your UserId and Password!")
            setUserId("");
            setpassword("");    
        }
    }

    return (
        <div className='container-fluid logon'>
            <div className="col-lg-6 login-box">
                <div className="ibox bg-boxshadow">
                    <div><img src={logo2} className="img-fluid logo" /></div>

                    <div className="ibox-title basic-form mb-30 bg-transparent ">
                        <h5>Sign In Here</h5>
                    </div>
                    <div className="ibox-content ">
                        {
                            <form onSubmit={handleSubmit} >
                                <div className="form-group row ">
                                    <label className="col-lg-3 col-form-label">Login Id</label>
                                    <div className="col-lg-9">
                                        <input
                                            type="text"
                                            value={UserId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            placeholder="UserId"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Password</label>

                                    <div className="col-lg-9">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                {loginErrorMssg ?
                                    <div>
                                        <p className="text-danger">{loginErrorMssg}</p>
                                    </div>
                                    : null
                                }
                                <div className="form-group row">
                                    <div className="col-lg-offset-2 col-lg-7">
                                        <div className="i-checks txt1"><a href="#"> Forgot Password !</a></div>
                                    </div>
                                    <div className="col-lg-offset-2 col-lg-5">
                                        <button className="btn rounded-0 btn-sm btn-danger btn-block" type="submit">Sign in</button>
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
