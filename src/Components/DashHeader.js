import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export default function HeaderDashboard(){



    return (
        <div>
        <header class="header-area home-2">
            <div class="page-top-bar-area top-menu d-flex align-items-center justify-content-between">
                <div class="logo-trigger-area d-flex align-items-center">
                    <a href="" class="logo mr-0">
                        <span class="big-logo">
                            <img src="/img/logo.png" alt="" />
                        </span>
                        <span class="small-logo">
                            <img src="/img/logo.png" alt="" />
                        </span>
                    </a>
                </div>
                <div class="top-search-bar">

                </div>
                <div class="user-meta-data d-flex align-items-center">
                    <div class="topbar-profile">
                        <div class="user---thumb">
                            <img src="" alt="" />
                            <img src="" alt=""/>
                        </div>
                        <div class="profile-data">
                            <div class="profile-user--details" >
                                <div class="profile---thumb-det">
                                    <img src="/img/member-img/member-2.jpg" alt=""/>
                                    <img src="" alt=""/>
                                </div>
                                <div class="profile---text-details">
                                        <h6>me</h6>
                                        <a href="">ggg</a>
                                </div>
                            </div>

                            <a class="profile-list--data" href="">
                                <div class="profile--list-icon">
                                    <i class="fa fa-cog" aria-hidden="true"></i>
                                </div>
                                <div class="notification--list-body-text profile">
                                    <h6>Change Password</h6>
                                </div>
                            </a>
                            <a class="profile-list--data" href=''>
                                <div class="profile--list-icon">
                                    <i class="fa fa-sign-out text-danger" aria-hidden="true"></i>
                                </div>
                                <div class="notification--list-body-text profile">
                                    <h6>Sign-out</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </div>
    )
}