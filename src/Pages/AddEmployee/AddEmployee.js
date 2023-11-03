import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../AddEmployee/AddEmployee.css';
import { DatePicker, Space } from 'antd';
import EmpListDropdown from '../../Components/EmplistDropdown/EmpListDropdown';
import { useNavigate } from "react-router-dom";
import { AspectRatio } from '@mui/icons-material';

export default function AddEmployee() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState("");
  const [Hierarchy1, setHierarchy1] = useState(null);
  const [Reportingto1, setReportingto1] = useState(null);
  const [Reportingto2, setReportingto2] = useState(null);
  const [Subverticallist, setSubverticallist] = useState(null);

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
  const [Name, setName] = useState(null);
  const [TeamType, setTeamType] = useState(null);
  const [Hierarchy, setHierarchy] = useState(null);
  const [Reportingto, setReportingto] = useState("null");
  const [ReportingtoSecond, setReportingtoSecond] = useState("null");
  const [ReportingtoThird, setReportingtoThird] = useState("null");
  const [JoiningDate, setJoiningDate] = useState("null");
  const [Aadhar, setAadhar] = useState('');
  const [Gender, setGender] = useState();
  const [PAN, setPAN] = useState();
  const [Groupname, setGroupname] = useState(null);
  const [BranchName, setBranchName] = useState(null);
  const [Vertical, setVertical] = useState();
  const [FilterDesignation, setFilterDesignation] = useState(999);
  const [OfficialEmail, setOfficialEmail] = useState();
  const [RefferedBy, setRefferedBy] = useState();
  const [EmpStatus, setEmpStatus] = useState();
  const [LoginId, setLoginId] = useState();
  const [Password, setPassword] = useState();
  const [VerificationDetails,setVerificationDetails] = useState();
  const [GradeId,setGradeId] = useState();
  const [CertificateDOB,setCertificateDOB] = useState();
  const [EmployeeId,setEmployeeId] = useState();
  const [UAN,setUAN] = useState();
  const [PresentLocation,setPresentLocation] = useState();
  const [FixedCtC,setFixedCtC] = useState();
  const [AnnualCtC,setAnnualCtC] = useState();
  const [IncentivePer,setIncentivePer] = useState();
  const [IncentiveAmt,setIncentiveAmt] = useState();
  const [EmployeeStatus,setEmployeeStatus] = useState();
  const [EmpStatFromDate,setEmpStatFromDate] = useState();
  const [EmpStatToDate,setEmpStatToDate] = useState();
  const [TotalExp,setTotalExp] = useState();
  const [Fathername,setFathername] = useState();
  const [Mothername,setMothername] = useState();
  const [Origindob,setOrigindob] = useState();
  const [PersonalContact,setPersonalContact] = useState();
  const [MaritalStatus, setMaritalStatus] = useState(null);
  const [AniversaryDate, setAniversaryDate] = useState();
  const [BloodGroup, setBloodGroup] = useState();
  const [Peremail, setPeremail] = useState();
  const [EmerContact,setEmerContact] = useState();
  const [RelationWcontact,setRelationWcontact] = useState();
  const [LandlineNo,setLandlineNo] = useState();
  const [PAddress,setPAddress] = useState();
  const [PCity,setPCity] = useState();
  const [PState,setPState] = useState();
  const [Pcountry,setPcountry] = useState();
  const [Ppincode,setPpincode] = useState();
  const [Pphone,setPphone] = useState();
  const [Caddress,setCaddress] = useState();
  const [Cstate,setCstate] = useState();
  const [Ccity,setCcity] = useState();
  const [Ccountry,setCcountry] = useState();
  const [Cpincode,setCpincode] = useState();
  const [Cphone,setCphone] = useState();
  const [Mpolicyname,setMpolicyname] = useState();
  const [Mpolicydetail,setMpolicydetail] = useState();
  const [Massuredamout,setMassuredamout] = useState();
  const [MediExpiry,setMediExpiry] = useState();
  const [Mnomieename,setMnomieename] = useState();
  const [Lpolicyname,setLpolicyname] = useState();
  const [Lpolicydetail,setLpolicydetail] = useState();
  const [Lassuredamount,setLassuredamount] = useState();
  const [LicExpiry,setLicExpiry] = useState();
  const [Lnomineename,setLnomineename] = useState();
  const [ResignDate,setResignDate] = useState();
  const [ResignAcceptBy,setResignAcceptBy] = useState();
  const [LastDate,setLastDate] = useState();
  const [ResignReason,setResignReason] = useState();

  async function AddEmployee(){
    let formData = {
      
    }
  }




  //#region setHierarchy
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
      setHierarchy1(Hierarchy.resData)
    }
  }

  async function GetHeirarchy1(e) {
    const res = await fetch(
      `https://localhost:44388/HrManual/ReportingListbyName?EmpID=${e}`,
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
      setReportingto1(reportingData.resData)
    }
  }

  async function GetReporting2(e) {
    const res = await fetch(
      `https://localhost:44388/HrManual/ReportingListbyName?EmpID=${e}`,
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
      setReportingto2(reportingData.resData)
    }
  }

  async function SubVerticalList(e) {
    const res = await fetch(
      `https://localhost:44388/HrManual/SubverticalList?VerticalId=${e}`,
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

  //#endregion

  //#region DateMapping

  const JoinDate = (date) => {
    console.log(date);
    setJoiningDate(date);
    console.log(JoiningDate);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  }

  const CerDOB = (date) => {
    setCertificateDOB(date);
  }

  const onEmpStatFromDate = (date) => {
    setEmpStatFromDate(date);
  }

  const onEmpStatToDate = (date) => {
    setEmpStatToDate(date);
  }

  const OriginDOB = (date) => {
    setOrigindob(date);
  }

  const AnniversaryDate= (date) => {
    setAniversaryDate(date);
  }

  const MediExpDate = (date) => {
    setMediExpiry(date);}

  const LexpDate = (date) => {
    setLicExpiry(date);
  }  

  const Resignationdate = (date) => {
    setResignDate(date);
  }

  const LastWorking = (date) => {
    setLastDate(date);
  }


  //#endregion


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
                            onChange={(e) => { setHierarchy(e.target.value); console.log(e.target.tex); GetHeirarchy(e.target.value); }}
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
                            onChange={(e) => { setReportingto(e.target.value); console.log(e.target.value); GetHeirarchy1(e.target.value); }}
                            required
                          >
                            <option value={"null"}>Select</option>
                            {Hierarchy1 ?
                              Hierarchy1.map((e) => (
                                <option key={e.employeeId} value={e.employeeId} >{e.name}</option>
                              )) : null}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reporting To (Second)<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          {(Reportingto === "null") ?
                            <select
                              style={{ width: "100%" }}
                            >
                              <option value={"null"}>Select</option>
                            </select>
                            :
                            <select
                              style={{ width: "100%" }}
                              onChange={(e) => { setReportingtoSecond(e.target.value); console.log(e.target.value); GetReporting2(e.target.value); }}

                            >
                              <option value={"null"}>Select</option>
                              {Reportingto1 ?
                                Reportingto1.map((e) => (
                                  <option key={e.employeeId} value={e.employeeId} >{e.name}</option>
                                )) : null}
                            </select>
                          }
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Reporting To (Third)<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          {(ReportingtoSecond === "null") ?
                            <select
                              style={{ width: "100%" }}
                            >
                              <option value={"null"}>Select</option>
                            </select>
                            :
                            <select
                              style={{ width: "100%" }}
                              onChange={(e) => { setReportingtoThird(e.target.value); console.log(e.target.value); }}

                            >
                              <option value={"null"}>Select</option>
                              {Reportingto2 ?
                                Reportingto2.map((e) => (
                                  <option key={e.employeeId} value={e.employeeId} >{e.name}</option>
                                )) : null}
                            </select>
                          }
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Joining Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={JoinDate} />
                          </Space>
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
                            value={Aadhar}
                            onChange={(e) => { setAadhar(e.target.value); console.log(Aadhar); }}
                            placeholder='Aadhar'
                            required
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
                            onChange={(e) => { setGender(e.target.value); console.log(e.target.value); }}
                            required
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
                            value={PAN}
                            onChange={(e) => { setPAN(e.target.value); console.log(PAN); }}
                            placeholder='PAN'
                            required
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
                            required
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
                            required
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
                          <select
                            onChange={(e) => { console.log(e.target.value); setVertical(e.target.value); SubVerticalList(e.target.value) }}
                            style={{ width: "100%" }}
                            required
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
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Designation<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <select value={FilterDesignation}
                            onChange={(e) => { console.log(e.target.value); setFilterDesignation(e.target.value) }}
                            style={{ width: "100%" }}
                            required
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
                            value={OfficialEmail}
                            onChange={(e) => setOfficialEmail(e.target.value)}
                            placeholder='E-mail'
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Referred-By<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={RefferedBy}
                            onChange={(e) => setRefferedBy(e.target.value)}
                            placeholder='Referred-By'
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
                            onChange={(e) => { console.log(e.target.value); setEmpStatus(e.target.value) }}
                            required
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
                            required
                            value={LoginId}
                            onChange={(e) => setLoginId(e.target.value)}
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
                            required
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Verification Details<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <div class="form-outline">
                            <textarea class="form-control" id="textArea1" rows="1" placeholder='messege'
                              value={VerificationDetails}
                              onChange={(e) => {setVerificationDetails(e.target.value); console.log(VerificationDetails);}}
                            >
                            </textarea>
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
                            required
                            onChange={(e) => { console.log(e.target.value); setGradeId(e.target.value)}}
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
                          <Space>
                            <DatePicker style={{ width: "100%" }} onChange={CerDOB} />
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
                            onChange={(e) => setEmployeeId(e.target.value)}
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
                            value={UAN}
                            onChange={(e) => setUAN(e.target.value)}
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
                            required
                            value={PresentLocation}
                            onChange={(e)=> setPresentLocation(e.target.value)}
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
                            required
                            value={FixedCtC}
                            onChange={(e) => setFixedCtC(e.target.value)}
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
                            required
                            value={AnnualCtC}
                            onChange={(e)=> setAnnualCtC(e.target.value)}
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
                            value={IncentivePer}
                            onChange={(e) => setIncentivePer(e.target.value)}
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
                            value={IncentiveAmt}
                            onChange={(e) => setIncentiveAmt(e.target.value)}
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
                            required
                            value={EmployeeStatus}
                            onChange={(e) => { console.log(e.target.value); setEmployeeStatus(e.target.value)}}
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
                            <DatePicker style={{ width: "100%" }} onChange={onEmpStatFromDate} />
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">To Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={onEmpStatToDate} />
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
                            value={TotalExp}
                            onChange={(e) => setTotalExp(e.target.value)}
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
                            value={Fathername}
                            required
                            onChange={(e) => setFathername(e.target.value)}
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
                            value={Mothername}
                            required
                            onChange={(e) => setMothername(e.target.value)}
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
                            <DatePicker style={{ width: "100%" }} onChange={OriginDOB}/>
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
                            required
                            value={PersonalContact}
                            onChange={(e)=> setPersonalContact(e.target.value)}
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
                            <option value={"true"}>Married</option>
                            <option value={"false"}>Unmarried</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Anniversary<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          {
                            (MaritalStatus === "true") ?
                              <Space >
                                <DatePicker style={{ width: "100%" }} onChange={AnniversaryDate} />
                              </Space>
                              :
                              <Space >
                                <DatePicker style={{ width: "100%" }} onChange={AnniversaryDate} disabled />
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
                            value={BloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)} 
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
                            required
                            value={Peremail}
                            onChange={(e) => setPeremail(e.target.value)}
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
                            required
                            value={EmerContact}
                            onChange={(e)=> setEmerContact(e.target.value)}
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
                            required
                            value={RelationWcontact}
                            onChange={(e)=> setRelationWcontact(e.target.value)}
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
                            value={LandlineNo}
                            onChange={(e) => setLandlineNo(e.target.value)}
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
                            value={PAddress}
                            required
                            onChange={(e) => setPAddress(e.target.value)}
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
                            required
                            value={PCity}
                            onChange={(e) => setPCity(e.target.value)}
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
                            required
                            value={PState}
                            onChange={(e) => setPState(e.target.value)}
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
                            required
                            value={Pcountry}
                            onChange={(e) => setPcountry(e.target.value)}
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
                            required
                            value={Ppincode}
                            onChange={(e)=> setPpincode}
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
                            required
                            value={Pphone}
                            onChange={(e) => {setPphone(e.target.value); console.log(Pphone);}}
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
                        <label class="col-md-5 mt-1 mb-0">Address<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Caddress}
                            onChange={(e)=> setCaddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">City<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Ccity}
                            onChange={(e)=> setCcity(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">State<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Cstate}
                            onChange={(e) => setCstate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Country<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Ccountry}
                            onChange={(e)=> setCcountry(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">PinCode<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Cpincode}
                            onChange={(e) => setCpincode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Phone<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={Cphone}
                            onChange={(e) => setCphone(e.target.value)}
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
                            value={Mpolicyname}
                            onChange={(e)=>setMpolicyname(e.target.value)}
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
                            value={Mpolicydetail}
                            onChange={(e)=> setMpolicydetail(e.target.value)}
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
                            value={Massuredamout}
                            onChange={(e)=> setMassuredamout(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={MediExpDate} />
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
                            value={Mnomieename}
                            onChange={(e)=> setMnomieename(e.target.value)}
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
                            value={Lpolicyname}
                            onChange={(e)=> setLpolicyname(e.target.value)}
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
                            value={Lpolicydetail}
                            onChange={(e)=> setLpolicydetail(e.target.value)}
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
                            value={Lassuredamount}
                            onChange={(e)=> setLassuredamount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                          <Space >
                            <DatePicker style={{ width: "100%" }} onChange={LexpDate} />
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
                            value={Lnomineename}
                            onChange={(e)=> setLnomineename(e.target.value)}
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
                        <Space >
                            <DatePicker style={{ width: "100%" }} onChange={Resignationdate} />
                          </Space>
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
                            value={ResignAcceptBy}
                            onChange={(e) => setResignAcceptBy(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="form-group d-flex">
                        <label class="col-md-5 mt-1 mb-0">Last Working Date<span class="float-right">:</span></label>
                        <div class="col-md-7">
                        <Space >
                            <DatePicker style={{ width: "100%" }} onChange={LastWorking} />
                          </Space>
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
                            value={ResignReason}
                            onChange={(e)=> setResignReason(e.target.value)}
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
