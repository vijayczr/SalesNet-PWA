import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Header/Header.css';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import '../../Pages/Dashboard/Dashboard.css'
import '../../assets/Default_pfp.svg.png'
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
            `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
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
    localStorage.setItem('userImage', profileData.image);
    const base64Image = `data:image/png;base64, ${profileData.image}`;


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
        else if (Response.resCode === 400) {
            SetLoginErrorMssg(Response.resData);
            SetresCOlor("text-danger");
        }
    }

    return (
        <div>
            <nav className="navbar cssHead">
                <div className="headlogo1 ">
                    <img src={logo2} className="img-fluid logo" />
                </div>
                <div className="d-flex align-items-end mr-5">
                    <Popover
                        placement="bottomRight"
                        content={<div className="profile-menu" style={{ margin: "-12px" }}>
                            <div className="profile-option p-3" >
                                <div className="mt-2 row">
                                    <div className="col-sm-1">
                                        <img src={base64Image} style={{ borderRadius:"50%"}} className="defaultpfp2" alt="../../assets/Default_pfp.svg.png" />
                                    </div>
                                    <div className="userDataa">
                                        <h6>{profileData.userName}</h6>
                                        <p>{profileData.email}</p>
                                    </div>
                                </div>
                            </div>
                            <a role="button" className="profile-list--data pt-3 btn popovers" style={{ borderBottom: "1px solid" }} data-toggle="modal" data-placement="top" data-target=".bd-example-modal-lg" >
                                <div className="profile--list-icon">
                                    <SettingOutlined style={{ fontSize: "25px", paddingRight: "20px" }} />
                                </div>
                                <div className="notification--list-body-text">
                                    <h6>Change Password</h6>
                                </div>
                            </a>
                            <a className="profile-list--data" href="/" style={{ color: "black", textDecoration: "none" }}>
                                <div className="profile--list-icon" >
                                    <LogoutOutlined style={{ fontSize: "25px", paddingRight: "20px" }} />
                                </div>
                                <div className="notification--list-body-text" >
                                    <h6 >Sign-out</h6>
                                </div>
                            </a>
                        </div>}>
                        <Button shape="circle" size="large" style={{ border: "none" }} >
                            <img src={base64Image} style={{ borderRadius:"50%"}} className="defaultpfp3" alt="../../assets/Default_pfp.svg.png" />
                        </Button>
                    </Popover>
                </div>
            </nav>
            <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Change Password</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-lg-12">
                                <div className="ibox-content ">
                                    {
                                        <form >
                                            <div className="form-group row ">
                                                <label className="col-lg-3 col-form-label">Old Password</label>
                                                <div className="col-lg-9">
                                                    <input
                                                        type="text"
                                                        value={OldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        placeholder="Old Password"
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">New Password</label>

                                                <div className="col-lg-9">
                                                    <input
                                                        type="password"
                                                        placeholder="New Password"
                                                        value={NewPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label">Confirm Password</label>

                                                <div className="col-lg-9">
                                                    <input
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        value={ConfirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {loginErrorMssg ?
                                                <div>
                                                    <p className={`${resCOlor}`}>{loginErrorMssg}</p>
                                                </div>
                                                : null
                                            }
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={Reset}>Reset</button>
                            <a href="#" ><button type="button" className="btn btn-primary" onClick={ChangePassword}>Change Password</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}