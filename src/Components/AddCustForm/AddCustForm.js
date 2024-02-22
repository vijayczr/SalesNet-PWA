import React, { useContext, useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function AddCustForm(
    PrevData
) {
    const navigate = useNavigate();
    const [BranchandVertical, setBranchandVertical] = useState(null);
    const [CustName, setCustName] = useState(null);
    const [CustBranch, setCustBranch] = useState(0);
    const [Address, setAddress] = useState(null);
    const [CustCity, setCustCity] = useState(null);
    const [CustState, setCustState] = useState(null);
    const [CustCountry, setCustCountry] = useState(null);
    const [CustPin, setCustPin] = useState(null);
    const [CustVertical, setCustVertical] = useState(0);
    const [CustSubVertical, setCustSubVertical] = useState(null);
    const [CustPhone1, setCustPhone1] = useState(null);
    const [CustPhone2, setCustPhone2] = useState(null);
    const [CustFax, setCustFax] = useState(null);
    const [Mobile, setMobile] = useState(null);
    const [CustEmail, setCustEmail] = useState(null);

    const [Subverticallist, setSubverticallist] = useState(null);

    useEffect(() => {
        let ignore = false;

        if (!ignore) getBranchAndVertical(); ViewCustDetail();
        return () => { ignore = true; }
    }, []);



    async function getBranchAndVertical() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/BranchAndVertical`,
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
            setBranchandVertical(profileData.resData);
        }
    }

    async function ViewCustDetail() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/ViewCustomer?customerId=${PrevData.customerId}`,
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
            setCustName(profileData.resData.customerName);
            setCustBranch(profileData.resData.branchId);
            setAddress(profileData.resData.customerAddress1);
            setCustCity(profileData.resData.customerCity);
            setCustState(profileData.resData.customerState);
            setCustCountry(profileData.resData.customerCountry);
            setCustPin(profileData.resData.customerZip);
            setCustVertical(profileData.resData.verticalId);
            setCustSubVertical(profileData.resData.subVerticalId);
            setCustPhone1(profileData.resData.customerPhone1);
            setCustPhone2(profileData.resData.customerPhone2);
            setCustFax(profileData.resData.customerFax);
            setMobile(profileData.resData.customerMobile);
            setCustEmail(profileData.resData.customerEmail);
        }
    }

    async function SubVerticalList(e) {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/SubverticalList?VerticalId=${e}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                }
            }
        )
        const reportingData = await res.json();
        if (reportingData.resCode === 200) {
            console.log(reportingData.resData);
            setSubverticallist(reportingData.resData)
        }
    }

    return (
        <div>
            <div
                className="containner p-4"
                style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-boxshadow">
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Customer Name<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustName}
                                                    onChange={(e) => { console.log(e.target.value); setCustName(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Branch<span style={{ color: "red" }}>*</span><span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={CustBranch}
                                                    onChange={(e) => { console.log(e.target.value); setCustBranch(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={0}>Select</option>
                                                    {
                                                        (BranchandVertical == null)
                                                            ? <></>
                                                            :
                                                            (
                                                                BranchandVertical.branch ?
                                                                    BranchandVertical.branch.map((e) => (
                                                                        <option value={e.branchId} >{e.branchName}</option>
                                                                    )) : null)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Address<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <textarea className="form-control" id="textArea1" rows="1" placeholder='messege'
                                                    value={Address}
                                                    onChange={(e) => { setAddress(e.target.value); }}
                                                    style={{ width: "220px" }}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">City<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustCity}
                                                    onChange={(e) => { console.log(e.target.value); setCustCity(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">State <span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustState}
                                                    onChange={(e) => { console.log(e.target.value); setCustState(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Country <span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustCountry}
                                                    onChange={(e) => { console.log(e.target.value); setCustCountry(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Pin<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustPin}
                                                    onChange={(e) => { console.log(e.target.value); setCustPin(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Vertical<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={CustVertical}
                                                    onChange={(e) => { console.log(e.target.value); setCustVertical(e.target.value); SubVerticalList(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={0}>Select</option>
                                                    {
                                                        (BranchandVertical == null)
                                                            ? <></>
                                                            :
                                                            (
                                                                BranchandVertical.vertical ?
                                                                    BranchandVertical.vertical.map((e) => (
                                                                        <option value={e.verticalId} >{e.verticalName}</option>
                                                                    )) : null)

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Sub-Vertical<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <select value={CustSubVertical}
                                                    onChange={(e) => { console.log(e.target.value); setCustSubVertical(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                    required
                                                >
                                                    <option value={"null"}>Select</option>
                                                    {Subverticallist ?
                                                        Subverticallist.map((e) => (
                                                            <option value={e} >{e}</option>
                                                        )) : null}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Phone1 <span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustPhone1}
                                                    onChange={(e) => { console.log(e.target.value); setCustPhone1(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Phone2 <span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustPhone2}
                                                    onChange={(e) => { console.log(e.target.value); setCustPhone2(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Fax<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustFax}
                                                    onChange={(e) => { console.log(e.target.value); setCustFax(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Mobile<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={Mobile}
                                                    onChange={(e) => { console.log(e.target.value); setMobile(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">E-mail ID<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    value={CustEmail}
                                                    onChange={(e) => { console.log(e.target.value); setCustEmail(e.target.value) }}
                                                />
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
