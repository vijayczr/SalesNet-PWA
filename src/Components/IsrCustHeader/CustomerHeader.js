import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../Header/AppHeader";

export default function CustomerHeader() {
    const [ProfileData, setProfileData] = useState("");


    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata();
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
        }
    }

  return (
    <div>
       <AppHeader data={ProfileData} />

       <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="row pt-1 pb-1">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Customer</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Customer</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
