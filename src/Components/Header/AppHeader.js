import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import { Button, Popover } from "antd";
import '../../Pages/Dashboard/Dashboard.css'
import { LogoutOutlined,SettingOutlined } from '@ant-design/icons';
import HrNavbar from '../Navbars/HrNavbar.js';

export default function AppHeader(props) {

    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [loginErrorMssg, SetLoginErrorMssg] = useState("");
    const [resCOlor, SetresCOlor] = useState("");
    const base64Image = `data:image/png;base64, ${props.data.image}`;

    const Reset = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        SetLoginErrorMssg("");
    }

    async function ChangePassword() {
        let formData = {
            OldPassword: OldPassword,
            NewPassword: NewPassword,
            ReEnterPassword: ConfirmPassword,
        }
        console.log(formData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/Authentication/changepassword`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(formData),
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            console.log(Response.resData);
            SetLoginErrorMssg("Password Change Successfull!");
            SetresCOlor("text-success");
        }
        else if(Response.resCode === 400){
            SetLoginErrorMssg(Response.resData);
            SetresCOlor("text-danger");
        }
    }
    return (
        <div >
            <nav class="navbar cssHead navbar-fixed-top">
                <div class="headlogo1 ">
                    <img src={logo2} class="img-fluid logo" />
                </div>

                <div class="top-search-bar" style={{ marginBottom: "-17px" }}>
                    <ul class="service-btns">
                        <li><a href="/Dashboard" style={{ textDecoration: "none" , fontWeight:"bold" }}>Dashboard</a></li>
                        <li><a href="/HumanResource" style={{ textDecoration: "none", fontWeight:"bold"  }}>Human Resource</a></li>
                        <li><a href="/Blogs" style={{ textDecoration: "none" , fontWeight:"bold" }}>Blog</a></li>
                        <li><a href="/KnowledgeShare" style={{ textDecoration: "none", fontWeight:"bold"  }}>Knowledge Sharing</a></li>
                        <li><a href="/HolidayList" style={{ textDecoration: "none", fontWeight:"bold"  }}>Holiday List</a></li>
                    </ul>
                </div>
                <div class="d-flex align-items-end mr-5">
                    <Popover
                        placement="bottomRight"
                        content={<div class="profile-menu" style={{ margin: "-12px" }}>
                            <div class="profile-option p-3" >
                                <div class="mt-2 row">
                                    <div class="col-sm-1">
                                        <img src={base64Image} style={{ borderRadius:"50%"}} class="defaultpfp2" alt="../../assets/Default_pfp.svg.png" />
                                    </div>
                                    <div class="userDataa">
                                        <h6>{props.data.userName}</h6>
                                        <p>{props.data.email}</p>
                                    </div>
                                </div>
                            </div>
                            <a role="button" class="profile-list--data pt-3 btn popovers" style={{ borderBottom: "1px solid" }} data-toggle="modal" data-placement="top" data-target=".bd-example1-modal-lg" >
                                <div class="profile--list-icon">
                                    <SettingOutlined style={{ fontSize: "25px", paddingRight: "20px" }} />
                                </div>
                                <div class="notification--list-body-text">
                                    <h6>Change Password</h6>
                                </div>
                            </a>
                            <a class="profile-list--data" href="/" style={{color:"black" , textDecoration:"none"}}>
                                <div class="profile--list-icon" >
                                <LogoutOutlined style={{fontSize:"25px" , paddingRight:"20px"}} />
                                </div>
                                <div class="notification--list-body-text" >
                                    <h6 >Sign-out</h6>
                                </div>
                            </a>
                        </div>}>
                        <Button shape="circle" size="large" >
                            <img src={base64Image} class="defaultpfp3" style={{ borderRadius:"50%"}} alt="../../assets/Default_pfp.svg.png" />
                        </Button>
                    </Popover>
                </div>
            </nav>
            <nav className="shadow p-2 px-4 border-bottom navbar-inverse navbar-fixed-top" style={{backgroundColor:"#f3f5f9"}}>
                <HrNavbar />
            </nav>
            <div class="modal fade bd-example1-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Change Password</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="col-lg-12">
                                <div class="ibox-content ">
                                    {
                                        <form >
                                            <div class="form-group row ">
                                                <label class="col-lg-3 col-form-label">Old Password</label>
                                                <div class="col-lg-9">
                                                    <input
                                                        type="text"
                                                        value={OldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        placeholder="Old Password"
                                                        class="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label">New Password</label>

                                                <div class="col-lg-9">
                                                    <input
                                                        type="password"
                                                        placeholder="New Password"
                                                        value={NewPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        class="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label">Confirm Password</label>

                                                <div class="col-lg-9">
                                                    <input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={ConfirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        class="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {loginErrorMssg ?
                                                <div>
                                                    <p class={`${resCOlor}`}>{loginErrorMssg}</p>
                                                </div>
                                                : null
                                            }
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={Reset}>Reset</button>
                            <a href="#" ><button type="button" class="btn btn-primary" onClick={ChangePassword}>Change Password</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    )
}