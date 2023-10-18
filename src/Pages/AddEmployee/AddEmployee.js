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


        </div>
    )
}
