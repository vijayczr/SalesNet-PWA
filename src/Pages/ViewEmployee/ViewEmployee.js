import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../AddEmployee/AddEmployee.css';
import { ConfigProvider, DatePicker, Space } from 'antd';
import EmpListDropdown from '../../Components/EmplistDropdown/EmpListDropdown';
import { useNavigate, useSearchParams } from "react-router-dom";
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import {Table} from 'antd';

export default function ViewEmployee(props) {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState("");
    const [Hierarchy1, setHierarchy1] = useState(null);
    const [data, setData] = useState();
    const [Reportingto1, setReportingto1] = useState(null);
    const [Reportingto2, setReportingto2] = useState(null);
    const [Vertic1, setVertic1] = useState("null");
    const [Subverticallist, setSubverticallist] = useState(null);
    const [searchparams] = useSearchParams();

    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: '10%',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            width: '15%',
        },
        {
            title: 'Vertical Name',
            dataIndex: 'verticalName',
            key: 'verticalName',
            width: '25%',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            width: '30%',
        },
        {
            title: 'Fixed Package',
            dataIndex: 'fixedPackage',
            key: 'fixedPackage',
            width: '20%',
        }
    ];



    console.log(searchparams.get("id"));
    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata(); EditEmployee(); EmpHistory();UserImage()
        return () => { ignore = true; }
    }, []);

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

    const [UserImagestring, setUserImagestring] = useState(null);
    async function UserImage() {
        const res = await fetch(
          `${localStorage.getItem("BaseUrl")}/Authentication/USerImage?EmpId=${searchparams.get("id")}`,
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
                    setUserImagestring(profileData.resData);
                }
      }
    
      const base64Image = `data:image/png;base64, ${UserImagestring}`;


    async function EmpHistory(){
        try {
            const res = await fetch(
                `${localStorage.getItem("BaseUrl")}/HrManual/EmpHistory?EmpId=${searchparams.get("id")}`,
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
                setData(profileData.resData);
            }
        } catch (e) {
            console.log("ok");
            navigate("/", { replace: true });
        }
    }



    const NavBack = () => {
        navigate(-1);
    }

    async function handleSubmit(e) {
        console.log(e.target.value);
        e.preventDefault();
    }
    const cancelCourse = () => {
        document.getElementById("clearForm").reset();
    }

    const [Name, setName] = useState(null);
    const [TeamType, setTeamType] = useState(null);
    const [Hierarchy, setHierarchy] = useState(null);
    const [Reportingto, setReportingto] = useState(null);
    const [ReportingtoSecond, setReportingtoSecond] = useState("null");
    const [ReportingtoThird, setReportingtoThird] = useState("null");
    const [JoiningDate, setJoiningDate] = useState("null");
    const [Aadhar, setAadhar] = useState('');
    const [Gender, setGender] = useState(null);
    const [PAN, setPAN] = useState(null);
    const [Groupname, setGroupname] = useState(null);
    const [BranchName, setBranchName] = useState(null);
    const [Vertical, setVertical] = useState("null");
    const [SubVertical, setSubVertical] = useState("null");
    const [FilterDesignation, setFilterDesignation] = useState(999);
    const [OfficialEmail, setOfficialEmail] = useState(null);
    const [RefferedBy, setRefferedBy] = useState(null);
    const [EmpStatus, setEmpStatus] = useState(null);
    const [LoginId, setLoginId] = useState(null);
    const [Password, setPassword] = useState(null);
    const [VerificationDetails, setVerificationDetails] = useState(null);
    const [GradeId, setGradeId] = useState(null);
    const [CertificateDOB, setCertificateDOB] = useState(null);
    const [EmployeeId, setEmployeeId] = useState(null);
    const [UAN, setUAN] = useState(null);
    const [PresentLocation, setPresentLocation] = useState(null);
    const [FixedCtC, setFixedCtC] = useState(null);
    const [AnnualCtC, setAnnualCtC] = useState(null);
    const [IncentivePer, setIncentivePer] = useState(null);
    const [IncentiveAmt, setIncentiveAmt] = useState(null);
    const [EmployeeStatus, setEmployeeStatus] = useState(null);
    const [EmpStatFromDate, setEmpStatFromDate] = useState(null);
    const [EmpStatToDate, setEmpStatToDate] = useState(null);
    const [TotalExp, setTotalExp] = useState(null);

    const [Fathername, setFathername] = useState(null);
    const [Mothername, setMothername] = useState(null);
    const [Origindob, setOrigindob] = useState(null);
    const [PersonalContact, setPersonalContact] = useState(null);
    const [MaritalStatus, setMaritalStatus] = useState(null);
    const [AniversaryDate, setAniversaryDate] = useState(null);
    const [BloodGroup, setBloodGroup] = useState(null);
    const [Peremail, setPeremail] = useState(null);
    const [EmerContact, setEmerContact] = useState(null);
    const [RelationWcontact, setRelationWcontact] = useState(null);
    const [LandlineNo, setLandlineNo] = useState(null);

    const [PAddress, setPAddress] = useState(null);
    const [PCity, setPCity] = useState(null);
    const [PState, setPState] = useState(null);
    const [Pcountry, setPcountry] = useState(null);
    const [Ppincode, setPpincode] = useState(null);
    const [Pphone, setPphone] = useState(null);
    const [Caddress, setCaddress] = useState(null);
    const [Cstate, setCstate] = useState(null);
    const [Ccity, setCcity] = useState(null);
    const [Ccountry, setCcountry] = useState(null);
    const [Cpincode, setCpincode] = useState(null);
    const [Cphone, setCphone] = useState(null);

    const [Mpolicyname, setMpolicyname] = useState(null);
    const [Mpolicydetail, setMpolicydetail] = useState(null);
    const [Massuredamout, setMassuredamout] = useState(null);
    const [MediExpiry, setMediExpiry] = useState(null);
    const [Mnomieename, setMnomieename] = useState(null);
    const [Lpolicyname, setLpolicyname] = useState(null);
    const [Lpolicydetail, setLpolicydetail] = useState(null);
    const [Lassuredamount, setLassuredamount] = useState(null);
    const [LicExpiry, setLicExpiry] = useState(null);
    const [Lnomineename, setLnomineename] = useState(null);

    const [ResignDate, setResignDate] = useState(null);
    const [ResignAcceptBy, setResignAcceptBy] = useState(null);
    const [LastDate, setLastDate] = useState(null);
    const [ResignReason, setResignReason] = useState(null);

    async function EditEmployee() {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/empdata?EmpId=${searchparams.get("id")}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const EmpData = await res.json();
        if (EmpData.resCode === 200) {
            const data = EmpData.resData;
            console.log(EmpData.resData);
            setName(data.name);
            setTeamType(data.teamType);
            setHierarchy(data.hierarchyId);
            setReportingto(data.reportingId);
            setReportingtoSecond(data.reportingId2);
            setReportingtoThird(data.reportingId3);
            setJoiningDate((data.joiningDate === null) ? null : data.joiningDate.toString().substring(0, 10));
            setAadhar(data.aadhar);
            setGender(data.gender);
            setPAN(data.pan);
            setGroupname(data.group);
            setBranchName(data.branch);
            setVertical(data.verticalId);
            // setVertic1(parseInt(data.VerticalId));
            setSubVertical(data.subVerticalid);
            setFilterDesignation(data.designationId);
            setOfficialEmail(data.officialEmail);
            setRefferedBy(data.referredby);
            setEmpStatus(data.status);
            setLoginId(data.loginId);
            setPassword(data.password);
            setVerificationDetails(data.verificationDetails);
            setGradeId(data.grade);
            setCertificateDOB((data.cer_DOB === null) ? null : data.cer_DOB.toString().substring(0, 10));
            setEmployeeId(data.employeeId);
            setUAN(data.uanno);
            setPresentLocation(data.presentLocation);
            setFixedCtC(data.fixedCtc);
            setAnnualCtC(data.annualCtc);
            setIncentivePer(data.incenticePercent);
            setIncentiveAmt(data.incentiveAmount);
            setEmployeeStatus(data.empStatus);
            setEmpStatFromDate((data.fromDate === null) ? null : data.fromDate.toString().substring(0, 10));
            setEmpStatToDate((data.toDate === null) ? null : data.toDate.toString().substring(0, 10));
            setTotalExp(data.totalexp);
            setFathername(data.fatherName);
            setMothername(data.motherName);
            setOrigindob((data.dob === null) ? null : data.dob.toString().substring(0, 10));
            setPersonalContact(data.personalContact);
            setMaritalStatus((data.maritalStatus === "True") ? "true" : "false");
            setAniversaryDate((data.anniversary === null) ? null : data.anniversary.toString().substring(0, 10));
            setBloodGroup(data.bloodgroup);
            setPeremail(data.personalemail);
            setEmerContact(data.emergencyContact);
            setRelationWcontact(data.realtionwithContact);
            setLandlineNo(data.landlineNumber);
            setPAddress(data.pAddress);
            setPCity(data.pCity);
            setPState(data.pState);
            setPcountry(data.pcountry);
            setPpincode(data.ppincode);
            setPphone(data.pphone);
            setCaddress(data.cAddress);
            setCstate(data.cState);
            setCcity(data.cCity);
            setCcountry(data.ccountry);
            setCpincode(data.cpincode);
            setCphone(data.cphone);
            setCpincode(data.cpincode);
            setMpolicyname(data.medi_PolicyName);
            setMpolicydetail(data.medi_PolicyDetail);
            setMassuredamout(data.medi_AssuredAmount);
            setMediExpiry((data.medi_ExpDate === null) ? null : data.medi_ExpDate.toString().substring(0, 10));
            setMnomieename(data.medi_NomineeName);
            setLpolicyname(data.lic_PolicyName);
            setLpolicydetail(data.lic_PolicyDetail);
            setLassuredamount(data.lic_AssuredAmount);
            setLicExpiry((data.lic_ExpDate === null) ? null : data.lic_ExpDate.toString().substring(0, 10));
            setLnomineename(data.lic_NomineeName);
            setResignDate((data.resignationDate === null) ? null : data.resignationDate.toString().substring(0, 10))
            setResignAcceptBy(data.acceptedBy);
            setLastDate((data.lastDate === null) ? null : data.lastDate.toString().substring(0, 10))
            setResignReason(data.reason);


        }

        GetHeirarchy(EmpData.resData.hierarchyId);
        console.log(EmpData.resData.hierarchyId);

        if (EmpData.resData.reportingId != null) {
            GetHeirarchy1(EmpData.resData.reportingId);
            console.log(EmpData.resData.reportingId);
        }

        if (EmpData.resData.reportingId2 != null) {
            GetReporting2(EmpData.resData.reportingId2);
            console.log(EmpData.resData.reportingId2);
        }

        SubVerticalList(EmpData.resData.verticalId);

        console.log(Vertical);

    }

    console.log(JoiningDate);
    // useEffect(() => {
    //   let ignore = false;
    //   if (!ignore) GetHeirarchy1(Reportingto);
    //   console.log(Reportingto);
    //   return () => { ignore = true; }
    // }, []);
    // const jDate = JoiningDate.toString().substring(0,10);
    // console.log(jDate);




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

    const AnniversaryDate = (date) => {
        setAniversaryDate(date);
    }

    const MediExpDate = (date) => {
        setMediExpiry(date);
    }

    const LexpDate = (date) => {
        setLicExpiry(date);
    }

    const Resignationdate = (date) => {
        setResignDate(date);
    }

    const LastWorking = (date) => {
        setLastDate(date);
    }
    console.log(Vertical);
    //#endregion


    return (
        <div class="containner">
            <AppHeader data={profileData} />

            <div class="breadcrumb-area">
                <div class="container-fluid">
                    <div class="row pt-1 pb-1">
                        <div class="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2> Employee </h2>
                            </nav>
                        </div>
                        <div class="col-md-6">
                            <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                                <li class="breadcrumb-item"><a href="/HR">HR</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Edit EMPLOYEE</li>
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

                                    <form id='clearForm' onSubmit={handleSubmit} >
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            value={Reportingto}
                                                            disabled
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
                                                                disabled
                                                                style={{ width: "100%" }}
                                                            >
                                                                <option value={"null"}>Select</option>
                                                            </select>
                                                            :
                                                            <select
                                                                value={ReportingtoSecond}
                                                                style={{ width: "100%" }}
                                                                disabled
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
                                                                disabled
                                                                style={{ width: "100%" }}
                                                            >
                                                                <option value={"null"}>Select</option>
                                                            </select>
                                                            :
                                                            <select
                                                                value={ReportingtoThird}
                                                                disabled
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
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker value={dayjs(JoiningDate)} style={{ width: "100%" }} onChange={JoinDate} disabled />
                                                            </ConfigProvider>
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
                                                            disabled
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
                                                            value={Gender}
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                        <select
                                                            value={BranchName}
                                                            onChange={(e) => { console.log(e.target.value); setBranchName(e.target.value) }}
                                                            style={{ width: "100%" }}
                                                            required
                                                            disabled
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
                                                            value={Vertical}
                                                            onChange={(e) => { console.log(e.target.value); setVertical(e.target.value); SubVerticalList(e.target.value) }}
                                                            style={{ width: "100%" }}
                                                            disabled
                                                            required
                                                        >
                                                            <option value={"null"}>Select</option>
                                                            <option value={"1"}>ASG</option>
                                                            <option value={"2"}>ISG</option>
                                                            <option value={"3"}>PSG</option>
                                                            <option value={"4"}>Corporate</option>
                                                            <option value={"5"}>Support Staff</option>
                                                            <option value={"6"}>ESG</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0">SubVertical<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                                                    <div class="col-md-7">
                                                        <select
                                                            value={SubVertical}
                                                            onChange={(e) => { console.log(e.target.value); setSubVertical(e.target.value) }}
                                                            style={{ width: "100%" }}
                                                            required
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            value={EmpStatus}
                                                            onChange={(e) => { console.log(e.target.value); setEmpStatus(e.target.value) }}
                                                            required
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                                disabled
                                                                onChange={(e) => { setVerificationDetails(e.target.value); console.log(VerificationDetails); }}
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
                                                            disabled
                                                            value={GradeId}
                                                            onChange={(e) => { console.log(e.target.value); setGradeId(e.target.value) }}
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
                                                            disabled
                                                        />
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
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0">Certificate Date of Birth<span class="float-right">:</span></label>
                                                    <div class="col-md-7">
                                                        <Space >
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker value={dayjs(CertificateDOB)} style={{ width: "100%" }} onChange={CerDOB} disabled />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space>
                                <DatePicker style={{ width: "100%" }} onChange={CerDOB} />
                              </Space> */}
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
                                                            disabled
                                                            value={EmployeeId}
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
                                                            disabled
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
                                                            disabled
                                                            value={PresentLocation}
                                                            onChange={(e) => setPresentLocation(e.target.value)}
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
                                                            disabled
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
                                                            disabled
                                                            value={AnnualCtC}
                                                            onChange={(e) => setAnnualCtC(e.target.value)}
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
                                                            value={EmployeeStatus}
                                                            onChange={(e) => { console.log(e.target.value); setEmployeeStatus(e.target.value) }}
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
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker value={dayjs(EmpStatFromDate)} style={{ width: "100%" }} onChange={onEmpStatFromDate} disabled />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={onEmpStatFromDate} />
                              </Space> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0">To Date<span style={{ color: "red" }}>*</span><span class="float-right">:</span></label>
                                                    <div class="col-md-7">
                                                        <Space >
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker value={dayjs(EmpStatToDate)} style={{ width: "100%" }} onChange={onEmpStatToDate} disabled />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={onEmpStatToDate} />
                              </Space> */}
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker value={dayjs(Origindob)} style={{ width: "100%" }} onChange={OriginDOB} disabled />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={OriginDOB} />
                              </Space> */}
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
                                                            disabled
                                                            value={PersonalContact}
                                                            onChange={(e) => setPersonalContact(e.target.value)}
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
                                                            disabled
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
                                                                    <ConfigProvider locale={locale}>
                                                                        <DatePicker value={dayjs(AniversaryDate)} style={{ width: "100%" }} onChange={AnniversaryDate} disabled />
                                                                    </ConfigProvider>
                                                                </Space>
                                                                // <Space >
                                                                //   <DatePicker style={{ width: "100%" }} onChange={AnniversaryDate} />
                                                                // </Space>
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
                                                            value={EmerContact}
                                                            onChange={(e) => setEmerContact(e.target.value)}
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
                                                            disabled
                                                            value={RelationWcontact}
                                                            onChange={(e) => setRelationWcontact(e.target.value)}
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
                                                            disabled
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
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0"></label>
                                                    <div class="col-md-7">
                                                    <img src={base64Image} style={{ width:"100px" , height:"100px"}} class="defaultpfp2" alt="../../assets/Default_pfp.svg.png" />

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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
                                                            onChange={(e) => setPpincode}
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
                                                            disabled
                                                            value={Pphone}
                                                            onChange={(e) => { setPphone(e.target.value); console.log(Pphone); }}
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
                                                            disabled
                                                            onChange={(e) => setCaddress(e.target.value)}
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
                                                            disabled
                                                            onChange={(e) => setCcity(e.target.value)}
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
                                                            disabled
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
                                                            disabled
                                                            value={Ccountry}
                                                            onChange={(e) => setCcountry(e.target.value)}
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
                                                            disabled
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
                                                            disabled
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
                                                            disabled
                                                            value={Mpolicyname}
                                                            onChange={(e) => setMpolicyname(e.target.value)}
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
                                                            disabled
                                                            value={Mpolicydetail}
                                                            onChange={(e) => setMpolicydetail(e.target.value)}
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
                                                            disabled
                                                            value={Massuredamout}
                                                            onChange={(e) => setMassuredamout(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                                                    <div class="col-md-7">
                                                        <Space >
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker disabled value={dayjs((MediExpiry === null) ? '2000-01-01' : MediExpiry)} style={{ width: "100%" }} onChange={MediExpDate} />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={MediExpDate} />
                              </Space> */}
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
                                                            disabled
                                                            onChange={(e) => setMnomieename(e.target.value)}
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
                                                            disabled
                                                            onChange={(e) => setLpolicyname(e.target.value)}
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
                                                            disabled
                                                            onChange={(e) => setLpolicydetail(e.target.value)}
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
                                                            disabled
                                                            value={Lassuredamount}
                                                            onChange={(e) => setLassuredamount(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 ">
                                                <div class="form-group d-flex">
                                                    <label class="col-md-5 mt-1 mb-0">Expiry Date<span class="float-right">:</span></label>
                                                    <div class="col-md-7">
                                                        <Space >
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker disabled value={dayjs((LicExpiry === null) ? '2000-01-01' : LicExpiry)} style={{ width: "100%" }} onChange={LexpDate} />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={LexpDate} />
                              </Space> */}
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
                                                            value={Lnomineename} disabled
                                                            onChange={(e) => setLnomineename(e.target.value)}
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
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker disabled value={dayjs((ResignDate === null) ? '2000-01-01' : ResignDate)} style={{ width: "100%" }} onChange={Resignationdate} />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={Resignationdate} />
                              </Space> */}
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
                                                            disabled
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
                                                            <ConfigProvider locale={locale}>
                                                                <DatePicker disabled value={dayjs((LastDate === null) ? '2000-01-01' : LastDate)} style={{ width: "100%" }} onChange={LastWorking} />
                                                            </ConfigProvider>
                                                        </Space>
                                                        {/* <Space >
                                <DatePicker style={{ width: "100%" }} onChange={LastWorking} />
                              </Space> */}
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
                                                            disabled
                                                            value={ResignReason}
                                                            onChange={(e) => setResignReason(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="box-footer mt-3">
                          <center style={{ padding: "10px" }}>
                            <button class="FunctionButton1" style={{ backgroundColor: "#183985" }} type="submit" >Submit</button>
                          </center>
                        </div> */}
                                            <div class="col-lg-12">
                                                <div class="form-group d-flex">
                                                    <h3>Employee History</h3>
                                                </div>
                                            </div>
                                            <div class="col-lg-8 ">
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Table: {
                                                                borderColor: '#000000',
                                                                headerBg: '#da251c',
                                                                headerColor: 'white',
                                                                cellFontSizeMD: 14,
                                                                rowHoverBg: '#abc4af',
                                                                fontSize: 16,
                                                                cellPaddingBlock: 0
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Table

                                                        columns={columns}
                                                        dataSource={data}
                                                        style={{ overflowX: "auto" }}
                                                    />
                                                </ConfigProvider>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}
