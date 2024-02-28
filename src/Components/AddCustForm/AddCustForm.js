import React, { useContext, useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Modal } from 'antd';

export default function AddCustForm(
    PrevData
) {
    const navigate = useNavigate();
    const [BranchandVertical, setBranchandVertical] = useState(null);
    const [CustName, setCustName] = useState("");
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

    const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");

    useEffect(() => {
        let ignore = false;

        if (!ignore) getBranchAndVertical(); ViewCustDetail()
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
            setCustBranch(profileData.resData.branch);
            setAddress(profileData.resData.customerAddress1);
            setCustCity(profileData.resData.customerCity);
            setCustState(profileData.resData.customerState);
            setCustCountry(profileData.resData.customerCountry);
            setCustPin(profileData.resData.customerZip);
            setCustVertical(profileData.resData.vertical);

            SubVerticalList(profileData.resData.vertical);

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

    const NavBack = () => {
        navigate(-1);
    };
    const DocSearchReser = () => {
        window.location.reload();
    };

    const AddNewCustomer = () => {
        ISRCustList();
    }

    const AddtoContact=()=>{
        ISRCustList2();
    }


    async function ISRCustList() {
        let PageData = {
            CustomerId: PrevData.customerId,
            CustomerName: CustName,
            Branch: Number(CustBranch),
            Vertical: Number(CustVertical),
            SubVerticalId: CustSubVertical,
            CustomerEmail: CustEmail,
            CustomerAddress1: Address,
            CustomerCity: CustCity,
            CustomerState: CustState,
            CustomerCountry: CustCountry,
            CustomerZip: CustPin,
            CustomerPhone1: CustPhone1,
            CustomerPhone2: CustPhone2,
            CustomerMobile: Mobile,
            CustomerFax: CustFax,
        };
        console.log(PageData);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/ISR/AddCustomer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtStoredValue}`,
            },
            body: JSON.stringify(PageData),
        });
        const Response = await res.json();
        if (Response.resCode === 200) {
            setCustBranch(0)
            onClick1();
        }
        if (Response.resCode === 400) {
            onClick2();
        }
    }

    async function ISRCustList2() {
        let PageData = {
            CustomerId: PrevData.customerId,
            CustomerName: CustName,
            Branch: Number(CustBranch),
            Vertical: Number(CustVertical),
            SubVerticalId: CustSubVertical,
            CustomerEmail: CustEmail,
            CustomerAddress1: Address,
            CustomerCity: CustCity,
            CustomerState: CustState,
            CustomerCountry: CustCountry,
            CustomerZip: CustPin,
            CustomerPhone1: CustPhone1,
            CustomerPhone2: CustPhone2,
            CustomerMobile: Mobile,
            CustomerFax: CustFax,
        };
        console.log(PageData);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/ISR/AddCustomer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtStoredValue}`,
            },
            body: JSON.stringify(PageData),
        });
        const Response = await res.json();
        if (Response.resCode === 200) {
            setCustBranch(0)
            navigate(
                {
                  pathname: "/CustContact",
                  search: createSearchParams({
                    id: Response.resData
                  }).toString(),
                  // state: { name: 'John Doe', age: 25 }
                },
              );
        }
        if (Response.resCode === 400) {
            onClick2();
        }
    }

    const onClick1 = () => {
        Modal.confirm({
            title: 'Success',
            content: 'EMPLOYEE ADDED SUCCESSFULLY',
            footer: (_, { OkBtn }) => (
                <>
                    <OkBtn className="FunctionButton" style={{ color: "white" }} onClick={() => window.location.reload()} />
                </>
            ),
        });
    }
    const onClick2 = () => {
        Modal.confirm({
            title: 'Bad Request',
            content: 'Enter Required Field',
            footer: (_, { OkBtn }) => (
                <>
                    <OkBtn className="FunctionButton" style={{ color: "white" }}  />
                </>
            ),
        });
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    style={{ height: "80px" }}
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
                                                    onChange={(e) => { console.log(e.target.value); setCustPin(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Vertical<span style={{ color: "red" }}>*</span><span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={CustVertical}
                                                    onChange={(e) => { console.log(e.target.value); setCustVertical(e.target.value); SubVerticalList(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
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
                                                    disabled={PrevData.FormType == "View"}
                                                    onChange={(e) => { console.log(e.target.value); setCustEmail(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {(PrevData.FormType === "View") ? null :
                                    <div className="box-footer mt-3">
                                        <center style={{ padding: "10px" }}>
                                            <button
                                                className="FunctionButton"
                                                style={{ backgroundColor: "#06960b", width: "70px" }}
                                                onClick={AddNewCustomer}
                                            >
                                                Submit
                                            </button>
                                            {(PrevData.FormType === "Edit") ? null :
                                                <button
                                                    className="FunctionButton"
                                                    style={{ backgroundColor: "#da251c" }}
                                                    onClick={DocSearchReser}
                                                >
                                                    Reset
                                                </button>
                                            }

                                            <button
                                                className="FunctionButton"
                                                style={{ backgroundColor: "#0b2087", width: "150px" }}
                                                onClick={AddtoContact}
                                            >
                                                + ADD Contact
                                            </button>
                                            <button
                                                className="FunctionButton"
                                                style={{ backgroundColor: "#e8d105", color: "black" }}
                                                onClick={NavBack}
                                            >
                                                Back
                                            </button>

                                        </center>
                                    </div>
                                }

                                {(PrevData.FormType === "View") ?
                                    <div className="box-footer mt-3">
                                        <center style={{ padding: "10px" }}>
                                            <button
                                                className="FunctionButton"
                                                style={{ backgroundColor: "#e8d105", color: "black" }}
                                                onClick={NavBack}
                                            >
                                                Back
                                            </button>
                                        </center>
                                    </div> : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
