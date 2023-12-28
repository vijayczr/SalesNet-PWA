import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';

export default function AddDar() {
  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [AppEngList, setAppEngList] = useState(null);
  const [Appeng, setAppeng] = useState(null);
  const [LeadType, setLeadType] = useState(null);
  const [JoiningDate1, setJoiningDate1] = useState(null);
  const [TodayTime, setTodayTime] = useState("01:00 PM");

  const [CustomerList, setCustomerList] = useState(null);

  // setJoiningDate1(new Date().toLocaleDateString());
  useEffect(() => {
    let ignore = false;

    if (!ignore) { getProfiledata(); GetAppEnggList() ;SearchCustomer(); }
    return () => { ignore = true; }
  }, []);

  var newDate = new Date().toLocaleDateString();

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

  const NavBack = () => {
    navigate(-1);
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

      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row pt-1 pb-1">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>DAR Entry</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">DAR Entry</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='containner p-4' style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }} >

        <div class="row">
          <div class="col-lg-12">
            <div class="bg-boxshadow">
              <div class="ibox-content">
                <center >
                  {/* <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button> */}
                  <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                </center>


                {/* <div class="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                  </center>
                </div> */}

                <div class="row mt-3">

                  <div class="col-lg-4 ">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1 mb-0">Employee Name<span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                          value={ProfileData.userName}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 ">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1 mb-0">Application Engineer<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => { setAppeng(e.target.value) }}
                        >
                          <option value={"null"}>Select</option>
                          {AppEngList ?
                            AppEngList.map((e) => (
                              <option key={e.empId} value={e.empId} >{e.empName}</option>
                            )) : null}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 ">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1 mb-0">Lead Type<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => { setLeadType(e.target.value) }}
                        >
                          <option value={null}>Select</option>
                          <option value={1}>Self</option>
                          <option value={2}>Lead</option>

                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 ">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1 mb-0">Lead No<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <select
                          style={{ width: "100%" }}
                        // onChange={(e) => { setLeadType(e.target.value) }}
                        >
                          <option value={null}>Select</option>

                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Date<span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        {/* <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={Date2} />
                                                </Space> */}
                        <Space >
                          <ConfigProvider>
                            <DatePicker
                               defaultValue={dayjs(Date.now())}
                               style={{ width: "100%" }} onChange={Date2} />
                          </ConfigProvider>
                        </Space>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 ">
                    <div class="form-group d-flex">
                      <label class="col-md-5 mt-1 mb-0">Visit Time<span class="float-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          style={{ width: "100%" }}
                          type='text'
                          onChange={(e) => { setTodayTime(e.target.value); }}
                          value={TodayTime}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-8 ">
                    <div class="form-group d-flex">
                      <label class="col-md-3 mt-1 mb-0">Customer<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                      <div class="col-md-9">
                        <Select
                          showSearch
                          style={{ width: 400 }}
                          placeholder="Search to Select"
                          onChange={(e)=> {console.log(e);}}
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
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
