import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo2 from '../../assets/logo.png';
import defaultpfp from '../../assets/Default_pfp.svg.png'
import { Button, Popover } from "antd";
import '../../Pages/Dashboard/Dashboard.css'
import HrNavbar from '../Navbars/HrNavbar';

export default function AppHeader() {
    return (
        <div >
            <nav class="navbar cssHead navbar-fixed-top">
                <div class="headlogo1 ">
                    <img src={logo2} class="img-fluid logo" />
                </div>

                <div class="top-search-bar" style={{ marginBottom: "-17px" }}>
                    <ul class="service-btns">
                        <li><a href="/Dashboard" style={{ textDecoration: "none" , fontWeight:"bold" }}>Dashboard</a></li>
                        <li><a href="/HRDocument" style={{ textDecoration: "none", fontWeight:"bold"  }}>Human Resource</a></li>
                        <li><a href="/Blogs" style={{ textDecoration: "none" , fontWeight:"bold" }}>Blog</a></li>
                        <li><a href="/KnowledgeSharing" style={{ textDecoration: "none", fontWeight:"bold"  }}>Knowledge Sharing</a></li>
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
                                        <img src={defaultpfp} class="defaultpfp2" alt="" />
                                    </div>
                                    <div class="userDataa">
                                        <h6>Vijay SIngh</h6>
                                        <p>vjvijay130@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <a href="/Dashboard">hey</a>
                        </div>}>
                        <Button shape="circle" size="large" >
                            <img src={defaultpfp} class="defaultpfp3" alt="" />
                        </Button>
                    </Popover>
                </div>
            </nav>
            <nav className="shadow p-2 px-4 border-bottom navbar-inverse navbar-fixed-top" style={{backgroundColor:"#f3f5f9"}}>
                <HrNavbar />
            </nav>
        </div>

    )
}