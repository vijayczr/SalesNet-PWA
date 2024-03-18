import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo2 from "../../../assets/logo.png"

export default function FormQuotation() {
    const [ProfileData, setProfileData] = useState("");
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();

    const [PreQuotData, setPreQuotData] = useState("");

    const [Vertical, setVertical] = useState(null);

    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata(); getQuotPreInfo();
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

    async function getQuotPreInfo() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/QuotPreInfo?DarId=${searchparams.get("id")}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const Res = await res.json();
        if (Res.resCode === 200) {
            console.log(Res.resData);
            setPreQuotData(Res.resData);
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
                                <h2>Quotation Form</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Quotation Form</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="containner p-4"
                style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-boxshadow">
                            <div className="ibox-content">
                                <div class="box-body">
                                    <table border="0" cellpadding="2" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="right">
                                                <img src={logo2} width="133" height="65" border="0" alt="TechLabs" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontSize: "14px" }} align="right">{PreQuotData.todayDate}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: "20px", fontSize: "14px", paddingTop: "20px" }}>
                                                <table border="0" cellspacing="0" cellpadding="2">
                                                    <tr>
                                                        <td>
                                                            <strong>Vertical:</strong>
                                                        </td>
                                                        <td>
                                                            <select
                                                            onChange={(e)=>{setVertical(e.target.value);console.log(Vertical);}}
                                                                style={{ width: "300px" ,height: "20px",paddingLeft: "5px" }}
                                                            >
                                                                <option value={0}>Select</option>
                                                                <option value={1}>ASG</option>
                                                                <option value={2}>ISG</option>
                                                                <option value={3}>PSG</option>
                                                                <option value={4}>Corporate</option>
                                                                <option value={5}>Support Staff</option>
                                                                <option value={6}>ESG</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>To,</b>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <p>ok</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
