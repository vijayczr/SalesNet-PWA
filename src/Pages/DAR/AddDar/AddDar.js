import React, { useCallback, useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import UserDataContext from "../../../Context/UserDataContext/UserDataContext";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DarComponent from "../../../Components/DarComponent/DarComponent";
import DarHeader from "../../../Components/DarHeader/DarHeader";
import "../AddDar/AddDar.css";
import { Spin } from "antd";
import { submitDarForm, uploadDarFile } from "../../../utils/api";
import dayjs from "dayjs";

export default function AddDar() {
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

  const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
  const { userData } = useContext(UserDataContext);

  // const [uploadFile, setUploadFile] = useState([]);

  const [darHeaderData, setDarHeaderData] = useState({
    profileData: userData,
    applicationEngineer: null,
    leadType: null,
    joiningDate: dayjs(),
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
      monthOfOrder: dayjs(),
      status: null,
      statusData: null,
      opportunityStatus: null,
      opportunityStatusData: { actualValue: null },
      remark: "",
      uploadFile: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [AppEngList, setAppEngList] = useState(null);
  const [customerList, setcustomerList] = useState(null);
  const [principalList, setPrincipalList] = useState(null);
  const [customerContactList, setCustomerContactList] = useState(null);

  useEffect(() => {
    GetAppEnggList();
    SearchCustomer();
    getPrincipalList();
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

  async function getPrincipalList() {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/Dar/PrincipalList`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
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

  const addForm = () => {
    setDarFormData((prev) => {
      let newData = [...prev];
      newData.push({
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
      });

      return newData;
    });
  };

  const submitForm = async () => {
    try {
      await Promise.allSettled(
        darFormData.map(async (darForm) => {
          let selectedProductsArr = darForm?.selectedProducts?.map((item) => ({
            key: item?.key,
            DarProductPrice: item?.techlabPrice,
            QuotedPrice: Number(item?.quotedPrice),
            ProductValue: Number(item?.productValue),
          }));

          let submitFormData = {
            CustomerId: darHeaderData?.customer,
            VisitDate: darHeaderData?.joiningDate,
            VisitTime: darHeaderData?.visitTime,
            LeadTypeId: darHeaderData?.leadType,
            AppEngId: darHeaderData?.applicationEngineer == null ? 0 : darHeaderData?.applicationEngineer,
            ContactPersonId: darForm?.contactPerson?.custId,
            CallTypeId: darForm?.callType,
            CallStatusId: darForm?.callStatus,
            VerticalId: darForm?.darVertical,
            OpportunityStatus: darForm?.opportunityStatus,
            DarStatusId: darForm?.status,
            Price: darForm?.expectedOrderValue,
            DarRemark: darForm?.remark,
            ...darForm?.statusData,
            ...darForm?.opportunityStatusData,
            MonthOfOrder: darForm?.monthOfOrder,
            Products: selectedProductsArr,
          };
console.log(submitFormData);
          try {
            const darFormSubmitResponse = await submitDarForm(
              jwtStoredValue,
              submitFormData
            );
            console.log(
              darFormSubmitResponse && darFormData?.uploadFile,
              darFormSubmitResponse,
              darForm?.uploadFile
            );
            if (darFormSubmitResponse && darForm?.uploadFile) {
              const darUploadFileResponse = await uploadDarFile(
                jwtStoredValue,
                darFormSubmitResponse,
                darForm.uploadFile
              );
            }

            setLoading(false);
            navigate("/DarSummary");
          } catch (err) {
            console.log("Error found", err);
          }
        })
      );
    } catch (error) {
      console.log("Promise all settled Failed", error);
    }
  };

  const removeForm = (index) => {
    if (
      (darFormData?.length === 1 && index === 0) ||
      index >= darFormData?.length
    ) {
      return;
    }
    setDarFormData((prev) => {
      let newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <Spin
      spinning={loading}
      style={{ top: "15rem", transform: "scale(1.2)" }}
      size="large"
      tip="Submitting the form"
    >
      <div className="add-dar-container">
        <AppHeader data={userData} />

        <div className="breadcrumb-area">
          <div className="container-fluid">
            <div className="row pt-1 pb-1">
              <div className="col-md-6">
                <nav aria-label="breadcrumb">
                  <h2>DAR Entry</h2>
                </nav>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                  <li className="breadcrumb-item">
                    <a href="/Dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    DAR Entry
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
          disabledField={false}
        />

        <div className="form-container">
          {darFormData?.map((formData, index) => {
            return (
              <div>
                <DarComponent
                  darFormData={formData}
                  setDarFormData={setDarFormData}
                  formIndex={index}
                  customerContactList={customerContactList}
                  principalList={principalList}
                  disabledField={false}
                  removeForm={removeForm}
                  formType={"Add"}
                />
              </div>
            );
          })}
        </div>

        <div className="btn-container">
          <Button className="add-form-btn" onClick={addForm}>
            Add Form +
          </Button>
          <Button
            className="submit-form-btn"
            onClick={() => {
              submitForm();
              setLoading(true);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Spin>
  );
}
