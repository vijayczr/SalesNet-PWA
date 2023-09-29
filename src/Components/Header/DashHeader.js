import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../Header/Header.css';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import '../../Pages/Dashboard/Dashboard.css'
import { Button, Popover } from "antd";
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
export default function HeaderDashboard() {

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
                                        <h6>Vijay SIngh</h6>
                                        <p>vjvijay130@gmail.com</p>
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
                                <div class="form-group d-flex">
                                    <label for="inputEmail3" class="col-md-5 mt-1">Old Password<span class="pull-right">:</span></label>
                                    <div class="col-md-7">
                                        <input value={"ok"} class="form-control"  readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary">Reset</button>
                            <a href="#" ><button type="button" class="btn btn-primary">Change Password</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}