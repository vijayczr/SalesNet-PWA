import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../AddEmployee/AddEmployee.css';
import { DatePicker, Space } from 'antd';
import EmpListDropdown from '../../Components/EmplistDropdown/EmpListDropdown';
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [Groupname, setGroupname] = useState(null);
  const [BranchName, setBranchName] = useState(null);
  const [MaritalStatus, setMaritalStatus] = useState(null);
  const [FilterDesignation, setFilterDesignation] = useState(999);
  const [profileData, setProfileData] = useState("");
  let hierarchylist = [];
  let hierarchydata = [];
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

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const [Name, setName] = useState(null);
  const [TeamType, setTeamType] = useState(null);
  const [Hierarchy, setHierarchy] = useState(null);
  const [option, setOption] = useState(null);
  console.log(option)
  async function GetHeirarchy(e) {
    const res = await fetch(
      `https://localhost:44388/HrManual/ReportingListbyHId?HierarchyId=${e}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Hierarchy = await res.json();
    if (Hierarchy.resCode === 200) {
      console.log(Hierarchy.resData);
      hierarchylist = Hierarchy.resData;
      setOption(Hierarchy.resData)
      console.log(option)
      

      // console.log(hierarchylist);

      // for(let i = 0; i < hierarchylist.length; i++){
      //   hierarchydata.push(
      //     <option value={i.employeeId}>{i.name}</option>
      //   )
      // }
      console.log(hierarchydata);
    }
  }


  return (
    <div class="containner">
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
                      <button class="FunctionButton" style={{ color: "white" }} onClick={NavBack}>Back</button>

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
                        <label class="col-md-5 mt-1 mb-0">Name <span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name'
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">TeamType <span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                            value={TeamType}
                            onChange={(e) => { setTeamType(e.target.value); }}
                            required
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Sales Team"}>Sales Team</option>
                            <option value={"Others"}>Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Hierarchy<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                            value={Hierarchy}
                            onChange={(e) => { setHierarchy(e.target.value); console.log(e.target.value);; GetHeirarchy(e.target.value); }}
                            required
                          >
                            {(TeamType === "Sales Team") ?
                              <>
                                <option value={0}>Select</option>
                                <option value={1}>DIRECTOR</option>
                                <option value={2}>CHIEF TECHNICAL OFFICER</option>
                                <option value={3}>DIVISIONAL HEAD</option>
                                <option value={4}>VERTICAL HEAD</option>
                                <option value={5}>SUB VERTICAL HEAD</option>
                                <option value={6}>REGIONAL HEAD</option>
                                <option value={7}>BRANCH HEAD</option>
                                <option value={8}>REPORTING HEAD</option>
                                <option value={9}>MARKETING ENGINEER</option>
                                <option value={10}>APPLICATION ENGINEER</option>
                              </>
                              :
                              <>
                                <option value={0}>Select</option>
                              </>

                            }
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reporting To<span style={{ color: "red" }}>*</span> <span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            
                            {option ?
                            option.map((e) =>(
                              <option key={e.employeeId} value={e.name} >{e.name}</option>
                            )):null}
{/* 
                            {hierarchylist.map((employee) => {
                              console.log(employee[0]);
                              return (
                                <option value={employee.employeeId}>{employee.name}</option>
                              );
                            })} */}
                            {/* {hierarchydata} */}

                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reporting To (Second)<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Sales Team"}>Sales Team</option>
                            <option value={"Others"}>Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reporting To (Third)<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Sales Team"}>Sales Team</option>
                            <option value={"Others"}>Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Joining Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Joining Date'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Aadhar<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Aadhar'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Gender<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Others"}>Others</option>
                            <option value={"Helicopter"}>Helicopter</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">PAN<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='PAN'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Group<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={Groupname}
                            onChange={(e) => { console.log(e.target.value); setGroupname(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Corporate"}>Corporate</option>
                            <option value={"Branch"}>Branch</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Branch<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={BranchName}
                            onChange={(e) => { console.log(e.target.value); setBranchName(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            {
                              (Groupname === "null")
                                ? <></>
                                :
                                (
                                  (Groupname === "Branch")
                                    ? <>
                                      <option value={"Delhi"}>Delhi</option>
                                      <option value={"Dehradun"}>Dehradun</option>
                                      <option value={"Bangalore"}>Bangalore</option>
                                      <option value={"Chennai"}>Chennai</option>
                                      <option value={"Hydrabad"}>Hydrabad</option>
                                      <option value={"Kolkata"}>Kolkata</option>
                                      <option value={"Pune"}>Pune</option>
                                    </>
                                    : <option value={"Corporate"}>Corporate</option>)
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Vertical<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={Groupname}
                            onChange={(e) => { console.log(e.target.value); setBranchName(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={1}>ASG</option>
                            <option value={2}>ISG</option>
                            <option value={3}>PSG</option>
                            <option value={4}>Corporate</option>
                            <option value={5}>Support Staff</option>
                            <option value={6}>ESG</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">SubVertical<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={Groupname}
                            onChange={(e) => { console.log(e.target.value); setGroupname(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Designation<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={FilterDesignation}
                            onChange={(e) => { console.log(e.target.value); setFilterDesignation(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <EmpListDropdown />
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Official E-mail<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='E-mail'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reffered-By<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Reffered-By'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Status<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Active"}>Active</option>
                            <option value={"InActive"}>InActive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Login Id<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Login Id'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Login Password<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Password'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Verification Details<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <div class="form-outline">
                            <textarea class="form-control" id="textAreaExample1" rows="1" placeholder='messege'></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Grade<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"1"}>G1</option>
                            <option value={"2"}>G2</option>
                            <option value={"3"}>G3</option>
                            <option value={"4"}>G4</option>
                            <option value={"5"}>T1</option>
                            <option value={"6"}>T2</option>
                            <option value={"7"}>T3</option>
                            <option value={"8"}>T4</option>
                            <option value={"9"}>T5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Attachments<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            type='file'
                            name='filename'
                            required />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">IsSalesnetUser<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input class="form-check-input ml-3"
                            type="checkbox"
                            id="checkboxNoLabel"
                            value=""
                            aria-label="..." style={{ height: "20px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Certificate Date of Birth<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Employee Id<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Employee Id'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">UAN No.<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='UAN No.'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Present Location<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Present Location'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Fixed CTC<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Fixed Package'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Annual CTC<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Annual CTC'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Incentive (%)<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Incentive (%)'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Incentive Amount<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Incentive Amount'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Employee Status<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={1}>Confirmed</option>
                            <option value={2}>probation</option>
                            <option value={3}>intern</option>
                            <option value={4}>Contractual</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">From Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">To Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Total number of Experience<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <div class="form-group d-flex">
                        <h4>Personal Details:-</h4>
                      </div>
                    </div>

                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Father's Name<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Fathers Name'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Mother's Name<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Mothers Name'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Original Date of Birth<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Personal Contact No.<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Marital Status<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select
                            value={MaritalStatus}
                            onChange={(e) => { console.log(e.target.value); setMaritalStatus(e.target.value) }}
                            style={{ width: "100%" }}
                          >
                            <option value={"null"}>Select</option>
                            <option value={"Married"}>Married</option>
                            <option value={"Unmarried"}>Unmarried</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Anniversary<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          {
                            (MaritalStatus === "Married") ?
                              <Space >
                                <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                              </Space>
                              :
                              <Space >
                                <DatePicker style={{ width: "100%" }} onChange={onChangeDate} disabled />
                              </Space>

                          }
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Blood Group<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Blood Group'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Personal E-mail<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Personal E-mail'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Emergency Contact Number<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">relation with that number<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='name'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">landline Number<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Upload image<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            type='file'
                            name='filename'
                            required />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0"></label>
                        <div class="col-md-7">
                          <p>ok</p>
                        </div>
                      </div>
                    </div>


                    <div class="col-lg-12">
                      <div class="form-group d-flex">
                        <h4>Contact Information-</h4>
                      </div>
                    </div>
                    <div class="col-lg-12 mt-0 mb-0">
                      <div class="form-group d-flex mt-0 mb-3" style={{ paddingLeft: "50px", width: "50%", backgroundColor: "#7194e4", color: "white" }}>
                        <p class="mt-0 mb-0">Permanent Address</p>
                      </div>
                    </div>

                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Address<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">City<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">State<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Country<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">PinCode<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Phone<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12 mt-0 mb-0">
                      <div class="form-group d-flex mt-0 mb-3" style={{ paddingLeft: "50px", width: "50%", backgroundColor: "#7194e4", color: "white" }}>
                        <p class="mt-0 mb-0">Correspondence Address</p>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Address<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">City<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">State<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Country<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">PinCode<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Phone<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>



                    <div class="col-lg-12">
                      <div class="form-group d-flex">
                        <h4>Mediclaim and LIC-</h4>
                      </div>
                    </div>
                    <div class="col-lg-12 mt-0 mb-0">
                      <div class="form-group d-flex mt-0 mb-3" style={{ paddingLeft: "50px", width: "50%", backgroundColor: "#7194e4", color: "white" }}>
                        <p class="mt-0 mb-0">Mediclaim Information</p>
                      </div>
                    </div>

                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Policy Name<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Policy Detail<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Assured Amount<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Nominee Name<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Nominee Name'
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12 mt-0 mb-0">
                      <div class="form-group d-flex mt-0 mb-3" style={{ paddingLeft: "50px", width: "50%", backgroundColor: "#7194e4", color: "white" }}>
                        <p class="mt-0 mb-0">LIC Information</p>
                      </div>
                    </div>

                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Policy Name<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Policy Detail<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Assured Amount<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Nominee Name<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            placeholder='Nominee Name'
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <div class="form-group d-flex">
                        <h4>Resignation</h4>
                      </div>
                    </div>

                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Resignation Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Accepted By<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Last Working Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reason<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                    <div class="box-footer mt-3">
                      <center style={{ padding: "10px" }}>
                        <button class="FunctionButton1" style={{ backgroundColor: "#183985" }} >Submit</button>
                      </center>
                    </div>








                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div >
  )
}
