import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HeaderDashboard from "../../Components/Header/DashHeader";
import humanResourceLogo from '../../assets/contract.png';
import KnowledgeSharinglogo from '../../assets/disbursement.png';
import HRlogo from '../../assets/voyage_ico.png';
import BlogLogo from '../../assets/laytime.png';
import HolidayListLogo from '../../assets/appointment.png';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const data1 = localStorage.getItem('EmpId');
    console.log(data1);

    return (
        <div>
            <HeaderDashboard />
            <section class="banner">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card text-center vision-card">
                                <div class="card-body">
                                    <h5 class="card-title">OUR VISION</h5>
                                    <p class="card-text">To be a world class provider of computer-aided engineering tools and services aimed at simplifying a client's business processes.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-3">
                            <div class="card text-center vision-card">
                                <div class="card-body">
                                    <h5 class="card-title">OUR MISSION</h5>
                                    <p class="card-text">To provide world class reliable solutions aimed at helping clients discover and harness competitive advantages, thus fully satisfying their business goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="page--wrapper navsecton">
                <div class="container-fluid">
                    <div class="row justify-content-center slider-row" style={{ padding: "50px" }}>
                        <div class="col-md-2">
                            <a
                                // onClick={
                                //     navigate("/HumanResource", { replace: true })}
                                // href="#"
                                href="/HumanResource"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={humanResourceLogo} class="img-fluid" />
                                <h5 class="text-center title W100">Human Resource</h5>
                            </a>
                        </div>
                        <div class="col-md-2">
                            <a
                                href="/KnowledgeShare"
                                // onClick={
                                //     navigate("/KnowledgeShare", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={KnowledgeSharinglogo} class="img-fluid" />
                                <h5 class="text-center title W100">Knowledge Sharing</h5>
                            </a>
                        </div>
                        <div class="col-md-2">
                            {(`${localStorage.getItem('EmpId')}` === '297')?<a
                                href="/DarSummary"
                                // onClick={
                                //     navigate("/HR", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HRlogo} class="img-fluid" />
                                <h5 class="text-center title W100">DAR Activity</h5>
                            </a>:
                            <a
                                href="/HR"
                                // onClick={
                                //     navigate("/HR", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HRlogo} class="img-fluid" />
                                <h5 class="text-center title W100">HR</h5>
                            </a>}
                        </div>
                        <div class="col-md-2">
                            <a>
                                <img src={BlogLogo} class="img-fluid" />
                                <h5 class="text-center title W100">Blogs</h5>
                            </a>
                        </div>
                        <div class="col-md-2">
                            <a
                                href="/HolidayList"
                                // onClick={
                                //     navigate("/HolidayList", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HolidayListLogo} class="img-fluid" />
                                <h5 class="text-center title W100">List Of Holidays</h5>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="copywrite-text">
                        <p>Copyright &copy; 2019. All Rights Reserved.</p>
                    </div>
                </div>
            </section>
        </div>

    )
}