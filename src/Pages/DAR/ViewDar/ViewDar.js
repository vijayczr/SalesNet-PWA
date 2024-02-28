import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import DarComponent from "../../../Components/DarComponent/DarComponent";
import DarHeader from "../../../Components/DarHeader/DarHeader";
import UserDataContext from "../../../Context/UserDataContext/UserDataContext";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { Button } from "antd";

export default function ViewDar(props) {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

  const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
  const { userData } = useContext(UserDataContext);


  const [darHeaderData, setDarHeaderData] = useState({
    profileData: userData,
    applicationEngineer: null,
    leadType: null,
    joiningDate: Date.now(),
    visitTime: "12:00 AM",
    customer: null,
  });

  const [darFormData, setDarFormData] = useState([
    {
      contactPerson: {
        custId: null,
        phoneNo: null,
        mobileNo: null,
        department: null,
        designation: null,
        email: null,
      },
      principal: {},
      selectedProducts: [],
      callType: null,
      callStatus: null,
      darVertical: null,
      expectedOrderValue: null,
      monthOfOrder: new Date(),
      status: null,
      statusData: null,
      opportunityStatus: null,
      opportunityStatusData: null,
      remark: "",
      uploadFile: null,
    },
  ]);

  const [AppEngList, setAppEngList] = useState(null);
  const [customerList, setcustomerList] = useState(null);
  const [principalList, setPrincipalList] = useState(null);
  const [customerContactList, setCustomerContactList] = useState(null);

  useEffect(() => {
    getDarData();
    GetAppEnggList();
    SearchCustomer();
    GetPrincipalList();
  }, []);

  useEffect(() => {
    getPersonContactList(darHeaderData?.customer);
    darFormData?.map((_, index) => {
      setDarFormData((prev) => {
        let newData = [...prev];
        newData[index] = {
          ...prev[index],
          contactPerson: {
            ...prev[index].contactPerson,
            custId: {},
          },
        };
        return newData;
      });
    });
  }, [darHeaderData?.customer]);

  async function getDarData() {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/Dar/ViewDar?DarId=${searchparams.get(
        "id"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
        },
      }
    );
    const response = await res.json();
    const responseData = response.resData;

    if (response.resCode === 200) {
      setDarHeaderData((prev) => ({
        ...prev,
        applicationEngineer: responseData?.appEngId,
        leadType: responseData?.leadTypeId,
        LeadId: responseData?.leadId,
        joiningDate: responseData.visitDate,
        visitTime: responseData.visitTime,
        customer: responseData?.customerId,
      }));

      let formStatusData = {};
      if (responseData.darStatusId === 1) {
        formStatusData.nextActionDate = responseData.nextActionDate;
      } else if (responseData.darStatusId === 2) {
        formStatusData.darClosingDate = responseData.darClosingDate;
      } else {
        formStatusData.lostReasonId = responseData.lostReasonId;
      }

      let formOpportunityData = {};
      if (responseData.opportunityStatus >= 4) {
        formOpportunityData.isFundAvailable = responseData.isFundAvailable;
      }
      if (responseData.opportunityStatus > 5) {
        formOpportunityData.orderValue = responseData.orderValue;
        formOpportunityData.advancePay = responseData.advancePay;
        formOpportunityData.gst = responseData.gst;
        formOpportunityData.gstPerc = responseData.gstPerc;
        formOpportunityData.deliveryPay = responseData.deliveryPay;
        formOpportunityData.trainingPay = responseData.trainingPay;
        formOpportunityData.actualValue = responseData.actualValue;
      }

      setDarFormData((prev) => {
        let newData = [...prev];
        newData[0] = {
          ...prev?.[0],
          contactPerson: {
            custId: responseData.contactPersonId,
            phoneNo: responseData.phoneNo,
            mobileNo: responseData.mobileNo,
            department: responseData.custDepartment,
            designation: responseData.custDesgn,
            email: responseData.email,
          },
          principal: responseData.principalId,
          selectedProducts: responseData.products,
          callType: responseData.callTypeId,
          callStatus: responseData.callStatusId,
          darVertical: responseData.verticalId,
          expectedOrderValue: responseData.price,
          monthOfOrder: responseData.monthOfOrder,
          status: responseData.darStatusId,
          statusData: formStatusData,
          opportunityStatus: responseData.opportunityStatus,
          opportunityStatusData: formOpportunityData,
          remark: responseData.darRemark,
          uploadFile: responseData.file,
          darComment: responseData.darComment
        };
        return newData;
      });

      getPersonContactList(responseData.customerId);
    }
  }

  async function getPersonContactList(customerId) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/Dar/CustpersonList?CustId=${customerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setCustomerContactList(Response.resData);
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
      setPrincipalList(Response.resData);
    }
  }

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
      setAppEngList(Response.resData);
    }
  }

  async function SearchCustomer() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setcustomerList(Response.resData);
    }
  }

  return (
    <>
      <div>
        <AppHeader data={userData} />

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
        <center>
            <Button
              size={"large"}
              className="FunctionButton"
              style={{
                backgroundColor: "#757575",
                color: "white",
                marginTop: "1rem",
              }}
              onClick={() => navigate("/DarSummary")}
            >
              Back
            </Button>
          </center>
        <DarHeader
          darHeaderData={darHeaderData}
          setDarHeaderData={setDarHeaderData}
          AppEngList={AppEngList}
          customerList={customerList}
          disabledField={true}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "4rem",
            justifyContent: "flex-start",
            backgroundColor: "#f3f5f9",
          }}
        >
          {darFormData?.map((formData, index) => {
            return (
              <div>
                <DarComponent
                  darFormData={formData}
                  setDarFormData={setDarFormData}
                  formIndex={index}
                  customerContactList={customerContactList}
                  principalList={principalList}
                  disabledField={true}
                  formType={"View"}
                  DarId={searchparams.get(
                    "id"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
