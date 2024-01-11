import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfigProvider, DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';

export default function ViewDar(props) {

  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [AppEngList, setAppEngList] = useState(null);
  const [Appeng, setAppeng] = useState(null);
  const [LeadType, setLeadType] = useState(null);
  const [JoiningDate1, setJoiningDate1] = useState(null);
  const [TodayTime, setTodayTime] = useState("01:00 PM");
  const [searchparams] = useSearchParams();

  const [CustomerList, setCustomerList] = useState(null);

  const [CustomerId, setCustomerId] = useState(null);
  const [CustContactList, setCustContactList] = useState(null);
  const [CustContactId, setCustContactId] = useState(null);
  const [CustPhone, setCustPhone] = useState(null);
  const [CustMobile, setCustMobile] = useState(null);
  const [CustDesig, setCustDesig] = useState(null);
  const [CustDept, setCustDept] = useState(null);
  const [CustEmail, setCustEmail] = useState(null);
  const [PrincipalList, setPrincipalList] = useState(null);
  const [PrincipalId, setPrincipalId] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [DarProductPrice, setDarProductPrice] = useState(null);
  const [QuotedPrice, setQuotedPrice] = useState(null);
  const [productValue, setproductValue] = useState(null);


  // setJoiningDate1(new Date().toLocaleDateString());
  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata(); GetAppEnggList(); SearchCustomer(); DarData();
    return () => { ignore = true; }
  }, []);

  var newDate = new Date().toLocaleDateString();

  async function DarData() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/ViewDar?DarId=${searchparams.get("id")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      setAppeng(Response.resData.appEngId);
      setLeadType(Response.resData.callTypeId);
      setJoiningDate1(Response.resData.visitDate);
      setTodayTime(Response.resData.visitTime);
      setCustomerId(Response.resData.customerId);



      setCustContactId(Response.resData.contactPersonId);
      setCustPhone(Response.resData.phoneNo);
      setCustMobile(Response.resData.mobileNo);
      setCustDesig(Response.resData.custDesgn);
      setCustDept(Response.resData.custDepartment);
      setCustEmail(Response.resData.email);

      GetCustContactList(Response.resData.customerId);
      GetPrincipalList();

      setPrincipalId(Response.resData.principalId);
      setProductName(Response.resData.productName);
      setDarProductPrice(Response.resData.darProductPrice);
      setQuotedPrice(Response.resData.quotedPrice);
      setproductValue(Response.resData.productValue);

      console.log(Response.resData);
    }
  }

  async function GetCustContactList(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/CustpersonList?CustId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setCustContactList(Response.resData);
    }
  }

  async function GetPrincipalList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/PrincipalList`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setPrincipalList(Response.resData);
    }
  }

  async function getProfiledata() {
    try {
      const res = await fetch(
        `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
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
  }

  const NavBack = () => {
    navigate("/DarSummary", { replace: true });
  }


  async function GetAppEnggList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/AppEngineer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setAppEngList(Response.resData)
    }
  }

  const Date2 = (date) => {
    console.log(date);
    setJoiningDate1(date);
  };

  async function SearchCustomer() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setCustomerList(Response.resData);
      console.log(Response.resData);
    }

  };

  return (
    <div>

      <AppHeader data={ProfileData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>View DAR</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">View DAR</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='containner p-4' style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }} >

        <div className="row">
          <div className="col-lg-12">
            <div className="bg-boxshadow">
              <div className="ibox-content">
                <center >
                  {/* <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button> */}
                  <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                </center>
                <div className="row mt-3">

                  <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                      <label className="col-md-5 mt-1 mb-0">Employee Name<span className="float-right">:</span></label>
                      <div className="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                          value={ProfileData.userName}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                      <label className="col-md-5 mt-1 mb-0">Application Engineer<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                      <div className="col-md-7">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => { setAppeng(e.target.value) }}
                          disabled
                          value={Appeng}
                        >
                          <option value={0}>Select</option>
                          {AppEngList ?
                            AppEngList.map((e) => (
                              <option key={e.empId} value={e.empId} >{e.empName}</option>
                            )) : null}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                      <label className="col-md-5 mt-1 mb-0">Lead Type<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                      <div className="col-md-7">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => { setLeadType(e.target.value) }}
                          value={LeadType}
                          disabled
                        >
                          <option value={null}>Select</option>
                          <option value={1}>Self</option>
                          <option value={2}>Lead</option>

                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                      <label className="col-md-5 mt-1 mb-0">Lead No<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                      <div className="col-md-7">
                        <select
                          style={{ width: "100%" }}
                        // onChange={(e) => { setLeadType(e.target.value) }}
                        >
                          <option value={null}>Select</option>

                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">Date<span className="pull-right">:</span></label>
                      <div className="col-md-7">
                        {/* <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={Date2} />
                                                </Space> */}
                        <Space >
                          <ConfigProvider>
                            <DatePicker
                              defaultValue={dayjs(Date.now())}
                              value={dayjs(JoiningDate1)}
                              disabled
                              style={{ width: "100%" }} onChange={Date2} />
                          </ConfigProvider>
                        </Space>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 ">
                    <div className="form-group d-flex">
                      <label className="col-md-5 mt-1 mb-0">Visit Time<span className="float-right">:</span></label>
                      <div className="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                          onChange={(e) => { setTodayTime(e.target.value); }}
                          value={TodayTime}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 ">
                    <div className="form-group d-flex">
                      <label className="col-md-3 mt-1 mb-0">Customer<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                      <div className="col-md-9">
                        <Select
                          showSearch
                          style={{ width: 400 }}
                          placeholder="Search to Select"
                          onChange={(e) => { console.log(e); }}
                          value={CustomerId}
                          disabled
                          optionFilterProp="children"
                          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                          }
                          options={CustomerList}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box bg-boxshadow" style={{ width: "43vw", boxShadow: "10px" }}>
                  <label class="col-md-12">Person Contacted</label>
                  <div className="col-md-12">
                    <select
                      style={{ width: "100%" }}
                      onChange={(e) => { setCustContactId(e.target.value) }}
                      disabled
                      value={CustContactId}
                    >
                      <option value={0}>Select</option>
                      {CustContactList ?
                        CustContactList.map((e) => (
                          <option key={e.custId} value={e.custId} >{e.contactPerson}</option>
                        )) : null}
                    </select>
                  </div>
                  <label class="col-md-12 mt-2">Designation</label>
                  <div className="col-md-12">
                    <input
                      style={{ width: "100%" }}
                      type='text'
                      disabled
                      onChange={(e) => { setCustDesig(e.target.value); }}
                      value={CustDesig}
                    />
                  </div>
                  <label class="col-md-12 mt-2">Department</label>
                  <div className="col-md-12">
                    <input
                      style={{ width: "100%" }}
                      type='text'
                      disabled
                      onChange={(e) => { setCustDept(e.target.value); }}
                      value={CustDept}
                    />
                  </div>
                  <label class="col-md-12 mt-2">Mobile</label>
                  <div className="col-md-12">
                    <input
                      style={{ width: "100%" }}
                      type='text'
                      disabled
                      onChange={(e) => { setCustMobile(e.target.value); }}
                      value={CustMobile}
                    />
                  </div>
                  <label class="col-md-12 mt-2">Phone</label>
                  <div className="col-md-12">
                    <input
                      style={{ width: "100%" }}
                      type='text'
                      disabled
                      onChange={(e) => { setCustPhone(e.target.value); }}
                      value={CustPhone}
                    />
                  </div>
                  <label class="col-md-12 mt-2">E-mail</label>
                  <div className="col-md-12">
                    <input
                      style={{ width: "100%" }}
                      type='text'
                      disabled
                      onChange={(e) => { setCustEmail(e.target.value); }}
                      value={CustEmail}
                    />
                  </div>
                  <label class="col-md-12 mt-2">Principal</label>
                  <div className="col-md-12">
                    <div className="form-group d-flex">
                      <div className="col-md-8">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => { setPrincipalId(e.target.value) }}
                          disabled
                          value={PrincipalId}
                        >
                          <option value={0}>Select</option>
                          {PrincipalList ?
                            PrincipalList.map((e) => (
                              <option key={e.principalId} value={e.principalId} >{e.principalName}</option>
                            )) : null}
                        </select>
                      </div>
                      <div class="col-md-4">
                        <button className="FunctionButton5" style={{ backgroundColor: "#e8d105", color: "black", width: "120px" }} >Add Product</button>
                      </div>
                    </div>
                  </div>

                  <div class="box" style={{ border: "solid" }}>
                    <div class="col-md-12">
                      <div className="form-group d-flex">
                        <div className="col-lg-3">
                          <div className="d-flex mt-1" >
                            <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Product</label>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Techlab MRP</label>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Product Value</label>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Quoted Price</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div className="form-group d-flex">
                        <div className="col-lg-3">
                          <div className="d-flex mt-1" >
                            {/* <label  className="col-md-12 m-0" style={{ fontWeight: "bold",padding:"0px" }}>Product</label> */}
                            <input
                              className="col-md-12 m-0"
                              style={{ width: "100%" }}
                              type='text'
                              value={ProductName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <input
                              className="col-md-12 m-0"
                              style={{ width: "100%" }}
                              type='text'
                              value={DarProductPrice}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <input
                              className="col-md-12 m-0"
                              style={{ width: "100%" }}
                              type='text'
                              value={QuotedPrice}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="d-flex mt-1">
                            <input
                              className="col-md-12 m-0"
                              style={{ width: "100%" }}
                              type='text'
                              value={productValue}
                              disabled
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

      </div>

    </div>
  )
}
