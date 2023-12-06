import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";

export default function ManageHoliday() {
    const navigate = useNavigate();
    const [ProfileData, setProfileData] = useState("");
    const [Branch, setBranch] = useState("");

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
            console.log(ProfileData.branch);
            setBranch(profileData.resData.branch)
        }
    }



    return (
        <div>
            <AppHeader data={ProfileData} />

            <div class="breadcrumb-area">
                <div class="container-fluid">
                    <div class="row pt-1 pb-1">
                        <div class="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Holidays</h2>
                            </nav>
                        </div>
                        <div class="col-md-6">
                            <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Holidays</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
