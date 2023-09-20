import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../HumanResource/HumanResource.css'

export default function HumanResource() {
  return (
    <div>
      <AppHeader />
      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2> HR Manuals</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb pull-right">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">HR Manuals</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}