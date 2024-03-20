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
    const [Salutation, setSalutation] = useState(null);
    const [ContactPerson, setContactPerson] = useState(null);
    const [Subject, setSubject] = useState(null);
    const [Respected, setRespected] = useState("Sir");
    const [Statictext1, setStatictext1] = useState(null);
    const [Statictext2, setStatictext2] = useState(null);
    const [ProductData, setProductData] = useState(null);


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
            setProductData(Res.resData.productData);
            setContactPerson(Res.resData.contactPerson);
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
                                                                onChange={(e) => { setVertical(e.target.value); console.log(Vertical); }}
                                                                style={{ width: "300px", height: "20px", paddingLeft: "5px" }}
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
                                        <tr>
                                            <td>
                                                <input
                                                    style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                    onChange={(e) => setSalutation(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b fontSize="14px">{PreQuotData.custName}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custAddress}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custCity}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custState}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custCountry} , {PreQuotData.custZip}</b><br></br>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: '30px' }}>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600" align="left">
                                                    <tr height="30px;">
                                                        <td width="199px">
                                                            <b>Kind Attention:</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={ContactPerson}
                                                                style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                                onChange={(e) => setContactPerson(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr height="30px;" paddingTop="0">
                                                        <td width="199px">
                                                            <b>Subject:</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                                onChange={(e) => setSubject(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: '20px', paddingBottom: "20px" }}>
                                                <strong>
                                                    <b>Respected</b>
                                                    <input
                                                    value={Respected}
                                                        style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                        onChange={(e) => setRespected(e.target.value)}
                                                    />,
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                We thank you for your requirement &nbsp;
                                                <input
                                                    style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                    onChange={(e) => setStatictext1(e.target.value)}
                                                />&nbsp;
                                                TECHLABS is technology-driven venture providing Indian industry and technical institutes
                                                leading–edge products in electronics, electrical, instrumentation and information
                                                technology. We are the&nbsp;
                                                <input
                                                    style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                    onChange={(e) => setStatictext2(e.target.value)}
                                                />&nbsp;
                                                . As desired please find below the our proposal as per your requirement:
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign: "center",  height: "20px"}}></td>
                                        </tr>
                                        <tr>
                                                <td>
                                                    Option 1
                                                    <table id="option1" style={{width:"100%"}}>
                                                        <tr style={{whiteSpace:"nowrap"}}>
                                                            <th>SNo</th>
                                                            <th>Description</th>
                                                            <th>Quantity</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                        
                                                    </table>
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
