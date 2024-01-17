import React, { useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import DarComponent from "../../../Components/DarComponent/DarComponent";
import DarHeader from "../../../Components/DarHeader/DarHeader";

export default function ViewDar(props) {
  const navigate = useNavigate();

  const [darHeaderData, setDarHeaderData] = useState({
    profileData: {},
    applicationEngineer: {},
    leadType: {},
    joiningDate: null,
    visitTime: null,
    customer: null,
  });

  const [darFormData, setDarFormData] = useState([
    {
      contactPerson: {
        custId: null,
        contactPerson: null,
        phoneNo: null,
        mobileNo: null,
        department: null,
        designation: null,
        email: null,
      },
      principal: {
        principalId: null,
        principalName: null,
      },
      callType: null,
      callStatus: null,
      darVertical: null, 
      expectedOrderValue: null,
    },
  ]);

  // const [profileData, setProfileData] = useState("");
  const [AppEngList, setAppEngList] = useState(null);
  const [LeadList, setLeadList] = useState([
    { id: 1, value: "Self" },
    { id: 2, value: "Lead" },
  ]);
  const [customerList, setcustomerList] = useState(null);
  const [principalList, setPrincipalList] = useState(null);

  const [Branch, setBranch] = useState("");
  // const [Appeng, setAppeng] = useState(null);
  // const [LeadType, setLeadType] = useState(null);
  const [JoiningDate1, setJoiningDate1] = useState(null);
  const [MonthOfOrder, setMonthOfOrder] = useState(null);
  const [TodayTime, setTodayTime] = useState("01:00 PM");
  const [searchparams] = useSearchParams();

  const [CustomerId, setCustomerId] = useState(null);
  const [customerContactList, setCustomerContactList] = useState(null);
  const [CustContactId, setCustContactId] = useState(null);
  const [CustPhone, setCustPhone] = useState(null);
  const [CustMobile, setCustMobile] = useState(null);
  const [CustDesig, setCustDesig] = useState(null);
  const [CustDept, setCustDept] = useState(null);
  const [CustEmail, setCustEmail] = useState(null);
  const [PrincipalId, setPrincipalId] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [DarProductPrice, setDarProductPrice] = useState(null);
  const [QuotedPrice, setQuotedPrice] = useState(null);
  const [productValue, setproductValue] = useState(null);
  const [CallType, setCallType] = useState(null);
  const [CallStatus, setCallStatus] = useState(null);
  const [DarVertical, setDarVertical] = useState(null);
  const [ExpectedOrdervalue, setExpectedOrdervalue] = useState(null);
  const [DarStatus, setDarStatus] = useState();
  const [NextActionDate, setNextActionDate] = useState(null);
  const [ClosingDate, setClosingDate] = useState(null);
  const [LostReason, setLostReason] = useState(null);
  const [OpportunityStatus, setOpportunityStatus] = useState(null);
  const [IsFundAvailAble, setIsFundAvailAble] = useState(null);
  const [OrderValue, setOrderValue] = useState(null);
  const [Advance, setAdvance] = useState(null);
  const [GstPerc, setGstPerc] = useState();
  const [TaxPrice, setTaxPrice] = useState(null);
  const [Delivery, setDelivery] = useState(null);
  const [Training, setTraining] = useState(null);
  const [Actualvalue, setActualvalue] = useState(null);
  const [Remark, setRemark] = useState(null);
  const [DocumentName, setDocumentName] = useState(null);

  const plainOptions = [5, 18, 28];
  // setJoiningDate1(new Date().toLocaleDateString());
  // useEffect(() => {
  //   getProfiledata(); GetAppEnggList(); SearchCustomer();
  // }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) DarData();
    getProfiledata();
    GetAppEnggList();
    SearchCustomer();
    return () => {
      ignore = true;
    };
  }, []);

  var newDate = new Date().toLocaleDateString();

  async function DarData() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/ViewDar?DarId=${searchparams.get(
        "id"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      // setAppeng(Response.resData.appEngId);
      // setLeadType(Response.resData.callTypeId);

      setDarFormData((prev) => ({
        ...prev,
        ApplicationEngineer: Response.resData.appEngId,
        LeadType: Response.resData.callTypeId,
        JoiningDate: Response.resData.visitDate,
      }));
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

      // GetPrincipalList();

      setPrincipalId(Response.resData.principalId);
      setProductName(Response.resData.productName);
      setDarProductPrice(Response.resData.darProductPrice);
      setQuotedPrice(Response.resData.quotedPrice);
      setproductValue(Response.resData.productValue);
      setCallType(Response.resData.callTypeId);
      setCallStatus(Response.resData.callStatusId);
      setDarVertical(Response.resData.verticalId);
      setExpectedOrdervalue(Response.resData.price);
      setMonthOfOrder(Response.resData.monthOfOrder);
      setDarStatus(Response.resData.darStatusId);
      setNextActionDate(Response.resData.nextActionDate);
      setClosingDate(Response.resData.darClosingDate);
      setLostReason(Response.resData.lostReasonId);
      setOpportunityStatus(Response.resData.opportunityStatus);
      setIsFundAvailAble(Response.resData.isFundAvailable);
      setOrderValue(Response.resData.orderValue);
      setAdvance(Response.resData.advancePay);
      setGstPerc(Response.resData.gstPerc);
      setTaxPrice(Response.resData.gst);
      setDelivery(Response.resData.deliveryPay);
      setTraining(Response.resData.trainingPay);
      setActualvalue(Response.resData.actualValue);
      setRemark(Response.resData.darRemark);
      setDocumentName(Response.resData.filename);

      console.log(Response.resData);
    }
  }

  async function GetCustContactList(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/CustpersonList?CustId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
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
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setPrincipalList(Response.resData);
    }
  }

  async function getProfiledata() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      console.log(profileData.resData);
      setProfileData(profileData.resData);
    }
  }

  const NavBack = () => {
    navigate("/DarSummary", { replace: true });
  };

  async function GetAppEnggList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/AppEngineer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setAppEngList(Response.resData);
    }
  }

  // const Date2 = (date) => {
  //   console.log(date);
  //   setJoiningDate1(date);
  // };
  const Date3 = (date) => {
    console.log(date);
    setMonthOfOrder(date);
  };
  const Date4 = (date) => {
    console.log(date);
    setNextActionDate(date);
  };
  const DateOfClosing = (date) => {
    console.log(date);
    setClosingDate(date);
  };
  // const GstvalueChange = (checkedValues) => {
  //   console.log('checked = ', checkedValues);
  //   GstPerc
  // };
  const GstvalueChange = ({ target: { value } }) => {
    setGstPerc(value);
  };

  function DgstValCal() {
    var x = OrderValue * (GstPerc / 100);
    setTaxPrice(x);
    console.log(x);
  }

  async function SearchCustomer() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setcustomerList(Response.resData);
      console.log(Response.resData);
    }
  }
  const DarStatusfun = (e) => {
    // console.log(e);
    setDarStatus(e);
  };

  return (
    <>
      <div>
        <AppHeader data={darHeaderData?.ProfileData} />

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
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    View DAR
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* <DarComponent
          darFormData={darFormData}
          setDarFormData={setDarFormData}
        /> */}
        <DarHeader
          darHeaderData={darHeaderData}
          setDarHeaderData={setDarHeaderData}
          AppEngList={AppEngList}
          LeadList={LeadList}
          customerList={customerList}
        />

        <div>
          {darFormData?.map((formData) => {
            return (
              <div>
                <DarComponent
                  darFormData={formData}
                  setDarFormData={setDarFormData}
                  customerContactList={customerContactList}
                  principalList={principalList}
                  callTypeList={callTypeList}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
