import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../AddEmployee/AddEmployee.css';
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata()
    return () => { ignore = true; }
  }, []);

  async function getProfiledata() {
    try {
      const res = await fetch(
        "https://localhost:44388/Authentication/ProfileData",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
          },
        }
      )
      const profileData = await res.json();
      if (profileData.resCode === 200) {
        console.log(profileData.resData);
        setProfileData(profileData.resData);
      }
    } catch (e) {
      console.log("ok");
      navigate("/", { replace: true });
    }
    // const profileData = await res.json();
    // if (profileData.resCode === 200) {
    //   console.log(profileData.resData);
    //   setProfileData(profileData.resData);
    // }
  }

  const NavBack = () => {
    navigate("/HR", { replace: true });
  }


  return (
    <div>
      <AppHeader data={profileData} />

      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row pt-1 pb-1">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2> Employee</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/HR">HR</a></li>
                <li class="breadcrumb-item active" aria-current="page">ADD EMPLOYEE</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='containner p-2' style={{ height: "600px", overflow: "auto", backgroundColor: "#f3f5f9" }} >

        <div class="row">
          <div class="col-lg-12">
            <div class="bg-boxshadow">
              <div class="ibox-content">

                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <span class="pull-right">
                      <button class="FunctionButton" style={{ backgroundColor: "#183985", color: "white" }} onClick={NavBack}>Back</button>

                    </span>
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <h4>Professional Details:-</h4>
                  </div>
                </div>

                <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1">Name <span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1">TeamType <span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <select
                            style={{width: "100%"}}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"Sales Team"}>Sales Team</option>
                          <option value={"Others"}>Others</option>
                        </select>
                      </div>
                    </div>
                </div>
                  <div class="col-lg-6 mt-1">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1">Hierarchy<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mt-1">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1">Reporting To<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <select
                            style={{width: "100%"}}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"Sales Team"}>Sales Team</option>
                          <option value={"Others"}>Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
