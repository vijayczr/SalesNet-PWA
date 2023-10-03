import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Header/Header.css';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import '../../Pages/Dashboard/Dashboard.css'
import { Button, Popover } from "antd";
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
export default function HeaderDashboard() {
    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [loginErrorMssg, SetLoginErrorMssg] = useState("");
    const [resCOlor, SetresCOlor] = useState("");
    const [profileData, setProfileData] = useState("");

    const Reset = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        SetLoginErrorMssg("");
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata()
        return () => { ignore = true; }
    }, []);

    async function getProfiledata() {

        const res = await fetch(
            "https://localhost:44388/Authentication/ProfileData",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
            const profileData = await res.json();
            if (profileData.resCode === 200) {
                console.log(profileData.resData);
                setProfileData(profileData.resData);
            }
    }

    async function ChangePassword() {
        let formData = {
            OldPassword: OldPassword,
            NewPassword: NewPassword,
            ReEnterPassword: ConfirmPassword,
        }
        console.log(formData);
        const res = await fetch(
            "https://localhost:44388/Authentication/changepassword",
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
        else if (Response.resCode === 400) {
            SetLoginErrorMssg(Response.resData);
            SetresCOlor("text-danger");
        }
    }

    return (
        <div>
            <nav class="navbar cssHead">
                <div class="headlogo1 ">
                    <img src={logo2} class="img-fluid logo" />
                </div>
                <div class="d-flex align-items-end mr-5">
                    <Popover
                        placement="bottomRight"
                        content={<div class="profile-menu" style={{ margin: "-12px" }}>
                            <div class="profile-option p-3" >
                                <div class="mt-2 row">
                                    <div class="col-sm-1">
                                        <img src={defaultpfp} class="defaultpfp2" alt="" />
                                    </div>
                                    <div class="userDataa">
                                        <h6>{profileData.userName}</h6>
                                        <p>{profileData.email}</p>
                                    </div>
                                </div>
                            </div>
                            <a role="button" class="profile-list--data pt-3 btn popovers" style={{ borderBottom: "1px solid" }} data-toggle="modal" data-placement="top" data-target=".bd-example-modal-lg" >
                                <div class="profile--list-icon">
                                    <SettingOutlined style={{ fontSize: "25px", paddingRight: "20px" }} />
                                </div>
                                <div class="notification--list-body-text">
                                    <h6>Change Password</h6>
                                </div>
                            </a>
                            <a class="profile-list--data" href="/" style={{ color: "black", textDecoration: "none" }}>
                                <div class="profile--list-icon" >
                                    <LogoutOutlined style={{ fontSize: "25px", paddingRight: "20px" }} />
                                </div>
                                <div class="notification--list-body-text" >
                                    <h6 >Sign-out</h6>
                                </div>
                            </a>
                        </div>}>
                        <Button shape="circle" size="large" style={{ border: "none" }} >
                            <img src={defaultpfp} class="defaultpfp3" alt="" />
                        </Button>
                    </Popover>
                </div>
            </nav>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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