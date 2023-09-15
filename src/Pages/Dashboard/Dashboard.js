import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HeaderDashboard from "../../Components/Header/DashHeader";


export default function Dashboard() {



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
        </div>

    )
}