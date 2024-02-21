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

    return (
        <div>
            <HeaderDashboard />
            <section className="banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card text-center vision-card">
                                <div className="card-body">
                                    <h5 className="card-title">OUR VISION</h5>
                                    <p className="card-text">To be a world className provider of computer-aided engineering tools and services aimed at simplifying a client's business processes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center vision-card">
                                <div className="card-body">
                                    <h5 className="card-title">OUR MISSION</h5>
                                    <p className="card-text">To provide world className reliable solutions aimed at helping clients discover and harness competitive advantages, thus fully satisfying their business goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page--wrapper navsecton">
                <div className="container-fluid">
                    <div className="row justify-content-center slider-row" style={{ padding: "50px" }}>
                        <div className="col-md-2">
                            <a
                                // onClick={
                                //     navigate("/HumanResource", { replace: true })}
                                // href="#"
                                href="/HumanResource"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={humanResourceLogo} className="img-fluid" />
                                <h5 className="text-center title W100">Human Resource</h5>
                            </a>
                        </div>
                        <div className="col-md-2">
                            <a
                                href="/KnowledgeShare"
                                // onClick={
                                //     navigate("/KnowledgeShare", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={KnowledgeSharinglogo} className="img-fluid" />
                                <h5 className="text-center title W100">Knowledge Sharing</h5>
                            </a>
                        </div>
                        <div className="col-md-2">
                            {(`${localStorage.getItem('EmpId')}` === '297')?<a
                                href="/DarSummary"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HRlogo} className="img-fluid" />
                                <h5 className="text-center title W100">DAR Activity</h5>
                            </a>:null}
                            {(`${localStorage.getItem('EmpId')}` === '1027')?<a
                                href="/HR"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HRlogo} className="img-fluid" />
                                <h5 className="text-center title W100">HR</h5>
                            </a>: null}
                            {(`${localStorage.getItem('EmpId')}` === '1040')?<a
                                href="/CustList"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HRlogo} className="img-fluid" />
                                <h5 className="text-center title W100">ISR</h5>
                            </a>: null}
                        </div>
                        <div className="col-md-2">
                            <a>
                                <img src={BlogLogo} className="img-fluid" />
                                <h5 className="text-center title W100">Blogs</h5>
                            </a>
                        </div>
                        <div className="col-md-2">
                            <a
                                href="/HolidayList"
                                // onClick={
                                //     navigate("/HolidayList", { replace: true })}
                                // href="#"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                <img src={HolidayListLogo} className="img-fluid" />
                                <h5 className="text-center title W100">List Of Holidays</h5>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="copywrite-text">
                        <p>Copyright &copy; 2019. All Rights Reserved.</p>
                    </div>
                </div>
            </section>
        </div>

    )
}